import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import SDK from "../../SDK";
import { toast } from "react-toastify";
import { updateUser } from "../../store/slices/authSlice";
import { Link, useSearchParams } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack";
import PopUpModal from "../../components/shared/PopUpModal";
import { FileInput, Label } from "flowbite-react";
import { useDictionary } from "../../provider/Language";

const activeTab = {
    personalInfo: "personal",
    changePassword: "password",
    manageNickname: "nickname",
    manageContact: "contact"
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const [dictionary] = useDictionary()
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, token } = useSelector((state) => state.auth);
    const [tabToOpen, setTabToOpen] = useState(searchParams.get("et") || activeTab.personalInfo);
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpenProfileImageModal, setIsOpenProfileImageModal] = useState(false);
    const [form, setForm] = useState({
        [activeTab.personalInfo]: {
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            tel: user.tel || "",
            birth_date: user.birth_date || "",
            nation: user.nation || "",
            city: user.city || "",
            bio: user.bio || "",
            metadata: user.metadata || {}
        },
        [activeTab.changePassword]: {
            current_password: "",
            new_password: "",
            conf_password: "",
        },
        [activeTab.manageContact]: {
            email: user.email || "",
        },
        [activeTab.manageNickname]: {
            nickname: user.nickname || "",
        },
    });

    const showTab = (tab) => {
        setTabToOpen(tab);
        setSearchParams({ et: tab });
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm((form) => ({
            ...form,
            [tabToOpen]: {
                ...form[tabToOpen],
                [name]: value,
            }
        }))
    }

    const handleDeleteImage = () => {
        setImagePreview(null);
    }

    const handleChangeImage = (event) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImagePreview({ 
                id: `profile-preview-${user._id}-${new Date().getTime()}`, 
                name: `profile-image-${new Date().getTime()}-${user._id}.${reader.result.split(",")[0].split("/")[1].split(";")[0]}`,
                src: reader.result 
            });
        }, false);
        reader.readAsDataURL(event.target.files[0]);
    }

    const handleUpdateImage = async () => {
        try {
            const { avatar: imageUrl } = await SDK.profile.updateImage({ avatar: imagePreview }, token);
            dispatch(updateUser({ avatar: imageUrl }));
            toast.success(`${dictionary.success.IMAGE}`);
            setImagePreview(null);
            setIsOpenProfileImageModal(false);
        } catch (error) {
            console.log(error);
            toast.error(`${dictionary.errors.WRONG}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formatBusinessProfilePayload = (payload) => {
            const fields = ["first_name", "last_name", "tel", "birth_date", "nation", "city", "bio", "metadata"];

            const obj = {};

            console.log(obj)

            Object.entries(payload).forEach(([key, value]) => {
                if (fields.includes(key) && value && value != "") {
                    obj[key] = value;
                } else {
                    if (!obj.metadata) obj.metadata = {};
                    if (value && value != "") {
                        obj.metadata = {...obj.metadata, [key]: value };
                    }
                }
            })

            return obj;
        }

        try {
            if (tabToOpen == activeTab.personalInfo) {
                const payload = user.role == "user" ? form[tabToOpen] : formatBusinessProfilePayload(form[tabToOpen]);

                console.log(payload)
                
                await SDK.profile.update(payload, token);
                dispatch(updateUser(payload));
                toast.success(`${dictionary.success.PROFILE}`);
            } else if (tabToOpen == activeTab.changePassword) {
                const { conf_password, ...payload } = form[tabToOpen];
                await SDK.account.updatePassword(payload, token);
                setForm((form) => ({
                    ...form,
                    [tabToOpen]: {
                        current_password: "",
                        new_password: "",
                        conf_password: "",
                    }
                }))
                toast.success(`${dictionary.success.PASSWORD}`);
            } else if (tabToOpen == activeTab.manageContact) {
                await SDK.account.updateEmail(form[tabToOpen], token);
                dispatch(updateUser(form[tabToOpen]));
                toast.success(`${dictionary.success.EMAIL}`);
            } else if (tabToOpen == activeTab.manageNickname) {
                await SDK.account.updateNickname(form[tabToOpen], token);
                dispatch(updateUser(form[tabToOpen]));
                toast.success(`${dictionary.success.NICKNAME}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`${dictionary.errors.WRONG}`);
        }
    }

    useEffect(() => {
        document.title = "Edit Profile - Found!";
    }, []);

    return (
        <>
            <div className="flex flex-col w-full max-w-[1280px] lg:max-w-[1320px]">
                <ButtonBack to={"/app/profile"} />
                {/* Tab */}
                <div className="flex bg-white rounded-lg shadow m-5 justify-around text-center dark:bg-elements_dark">
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.personalInfo)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.personalInfo ? " border-b-4 border-b-primaryColor" : "")}>{dictionary.editProfile.PERSONAL}</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.changePassword)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.changePassword ? " border-b-4 border-b-primaryColor" : "")}>{dictionary.editProfile.CHANGE}</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.manageNickname)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.manageNickname ? " border-b-4 border-b-primaryColor" : "")}>{dictionary.editProfile.NICKNAME}</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer dark:text-slate-100" onClick={() => showTab(activeTab.manageContact)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.manageContact ? " border-b-4 border-b-primaryColor" : "")}>{dictionary.editProfile.CONTACT}</span>
                    </div>
                </div>
                {/* Information Container */}
                <div className="flex bg-white rounded-lg shadow m-5 p-6 dark:bg-elements_dark">
                    <form className="w-full" onSubmit={handleSubmit} >
                        {
                            tabToOpen == activeTab.personalInfo && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">{dictionary.editProfile.PERSONAL}:</h2>
                                    <div className="flex mb-5 max-md:flex-col max-md:items-center">
                                        <div className="flex justify-center items-center min-w-32 h-32 relative bg-white rounded-[50%] shadow my-14 ml-14 mr-16 dark:bg-elements_dark dark:shadow-slate-400">
                                            <div style={{ backgroundImage: `url(${user.avatar}?token=${token})` }} className="imgProfile bg-cover bg-center"></div>
                                            <div className="relative">
                                                {
                                                    <PopUpModal 
                                                        title={dictionary.editProfile.IMAGE} 
                                                        sizeModal={"md"}
                                                        onCloseModal={() => setImagePreview(null)}
                                                        isOpen={isOpenProfileImageModal}
                                                        setIsOpen={setIsOpenProfileImageModal}
                                                        showBtn={(openModal) => {
                                                            return <div onClick={() => openModal(true)} className="flex justify-center items-center absolute w-10 h-10 -bottom-16 right-1 cursor-pointer bg-primaryColor rounded-[50%] btn-tooltip">
                                                                <i className="fa-solid fa-pen text-white"></i>
                                                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                                                    {dictionary.editProfile.EDIT}
                                                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                                </div>
                                                            </div>;
                                                        }}
                                                    >
                                                        {
                                                            <>
                                                                {
                                                                    imagePreview ? (
                                                                        <div className="flex flex-col w-full items-center justify-center">
                                                                            <div className="flex w-full items-center justify-center">
                                                                                <div style={{ backgroundImage: `url(${imagePreview.src})` }} className={`h-[150px] w-[150px] bg-cover bg-center rounded-full flex justify-center items-center relative`}>
                                                                                    <span 
                                                                                        onClick={handleDeleteImage} 
                                                                                        className="absolute cursor-pointer right-[-12.5px] top-[-12.5px] h-[25px] w-[25px] bg-slate-100 text-slate-500 rounded-full flex justify-center items-center border-2 border-slate-300">
                                                                                        x
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex justify-center mt-4">
                                                                                <motion.button 
                                                                                    onClick={handleUpdateImage} 
                                                                                    className="btn"
                                                                                    whileTap={{ scale: 0.95 }}
                                                                                >
                                                                                    {dictionary.btn.SAVE}
                                                                                </motion.button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex w-full items-center justify-center">
                                                                            <Label
                                                                                htmlFor="dropzone-file"
                                                                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                                            >
                                                                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                                                    <svg
                                                                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                                                        aria-hidden="true"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 20 16"
                                                                                    >
                                                                                        <path
                                                                                            stroke="currentColor"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="2"
                                                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                                        />
                                                                                    </svg>
                                                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                                                    </p>
                                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                                                </div>
                                                                                <FileInput id="dropzone-file" onChange={handleChangeImage} className="hidden" />
                                                                            </Label>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        }
                                                    </PopUpModal>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-around">
                                            {
                                                user.role == "business" && (
                                                    <>
                                                        <div className="flex flex-col w-2/5">
                                                            <label htmlFor="company_name" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.COMPANY_NAME}</label>
                                                            <input type="text" name="company_name" id="company_name" onInput={handleInput} value={form.personal.metadata.company_name} className="my-2 p-2 input_field" />
                                                        </div>
                                                        <div className="flex flex-col w-2/5">
                                                            <label htmlFor="vat_number" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.VAT_NUMBER}</label>
                                                            <input type="text" name="vat_number" id="vat_number" onInput={handleInput} value={form.personal.metadata.vat_number} className="my-2 p-2 input_field" />
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="first_name" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.NAME}</label>
                                                <input type="text" name="first_name" id="first_name" onInput={handleInput} value={form.personal.first_name} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="last_name" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.SURNAME}</label>
                                                <input type="text" name="last_name" id="last_name" onInput={handleInput} value={form.personal.last_name} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="tel" className="font-semibold mt-1 dark:text-slate-300">{dictionary.editProfile.PHONE}</label>
                                                <input type="text" name="tel" id="tel" onInput={handleInput} value={form.personal.tel} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="birth_date" className="font-semibold mt-1 dark:text-slate-300">{dictionary.editProfile.BIRTHDAY}</label>
                                                <input type="date" name="birth_date" id="birth_date" onInput={handleInput} value={form.personal.birth_date} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="nation" className="font-semibold mt-1 dark:text-slate-300">{dictionary.editProfile.COUNTRY}</label>
                                                <input type="text" name="nation" id="nation" onInput={handleInput} value={form.personal.nation} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="city" className="font-semibold mt-1 dark:text-slate-300">{dictionary.editProfile.CITY}</label>
                                                <input type="text" name="city" id="city" onInput={handleInput} value={form.personal.city} className="my-2 p-2 input_field" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="bio" className="font-semibold mt-1 dark:text-slate-300">{dictionary.editProfile.BIO}</label>
                                        <textarea name="bio" id="bio" onInput={handleInput} value={form.personal.bio} placeholder="Racconta qualcosa di te..." className="my-2 p-2 input_field max-lg:min-h-20"></textarea>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tabToOpen == activeTab.changePassword && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">{dictionary.editProfile.CHANGE}</h2>
                                    <div className="flex justify-around gap-5">
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="current-password" className="font-semibold mt-2 dark:text-slate-300">{dictionary.editProfile.CURRENT_PW}</label>
                                            <input type="password" name="current_password" id="current-password" onInput={handleInput} value={form.password.current_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="new-password" className="font-semibold mt-2 dark:text-slate-300">{dictionary.editProfile.NEW_PW}</label>
                                            <input type="password" name="new_password" id="new-password" onInput={handleInput} value={form.password.new_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="conf_password" className="font-semibold mt-2 dark:text-slate-300">{dictionary.globals.PW_CONFIRM}</label>
                                            <input type="password" name="conf_password" id="conf_password" onInput={handleInput} value={form.password.conf_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tabToOpen == activeTab.manageNickname && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">{dictionary.editProfile.manageNickname}</h2>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="nickname" className="font-semibold mt-1 dark:text-slate-300">Nickname</label>
                                            <input type="text" name="nickname" id="nickname" value={form.nickname.nickname} onInput={handleInput} className="my-2 p-2 input_field" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tabToOpen == activeTab.manageContact && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">{dictionary.editProfile.CONTACT}</h2>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="email" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.EMAIL}</label>
                                            <input type="email" name="email" id="email" value={form.contact.email} onInput={handleInput} className="my-2 p-2 input_field" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="mt-8">
                            <motion.button type="submit" className="btn"
                                whileTap={{ scale: 0.95 }}
                            >
                                {dictionary.btn.SAVE}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default EditProfile