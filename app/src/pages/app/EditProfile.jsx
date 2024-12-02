import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import SDK from "../../SDK";
import { toast } from "react-toastify";
import { updateUser } from "../../store/slices/authSlice";
import { Link, useSearchParams } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack";

const activeTab = {
    personalInfo: "personal",
    changePassword: "password",
    manageNickname: "nickname",
    manageContact: "contact"
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, token } = useSelector((state) => state.auth);
    const [tabToOpen, setTabToOpen] = useState(searchParams.get("et") || activeTab.personalInfo);
    const [form, setForm] = useState({
        [activeTab.personalInfo]: {
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            tel: user.tel || "",
            birth_date: user.birth_date || "",
            nation: user.nation || "",
            city: user.city || "",
            bio: user.bio || "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (tabToOpen == activeTab.personalInfo) {
                await SDK.profile.update(form[tabToOpen], token);
                dispatch(updateUser(form[tabToOpen]));
                toast.success("Profile Informations Updated");
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
                toast.success("Password Updated");
            } else if (tabToOpen == activeTab.manageContact) {
                await SDK.account.updateEmail(form[tabToOpen], token);
                dispatch(updateUser(form[tabToOpen]));
                toast.success("Email Updated");
            } else if (tabToOpen == activeTab.manageNickname) {
                await SDK.account.updateNickname(form[tabToOpen], token);
                dispatch(updateUser(form[tabToOpen]));
                toast.success("Nickname Updated");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
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
                <div className="flex bg-white rounded-lg shadow m-5 justify-around dark:bg-elements_dark">
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.personalInfo)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.personalInfo ? " border-b-4 border-b-primayColor" : "")}>Personal Information</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.changePassword)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.changePassword ? " border-b-4 border-b-primayColor" : "")}>Change Password</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer" onClick={() => showTab(activeTab.manageNickname)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.manageNickname ? " border-b-4 border-b-primayColor" : "")}>Manage Nickname</span>
                    </div>
                    <div className="py-4 px-2 cursor-pointer dark:text-slate-100" onClick={() => showTab(activeTab.manageContact)}>
                        <span className={"text-lg px-2 dark:text-slate-100" + (tabToOpen == activeTab.manageContact ? " border-b-4 border-b-primayColor" : "")}>Manage Contact</span>
                    </div>
                </div>
                {/* Information Container */}
                <div className="flex bg-white rounded-lg shadow m-5 p-6 dark:bg-elements_dark">
                    <form className="w-full" onSubmit={handleSubmit} >
                        {
                            tabToOpen == activeTab.personalInfo && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">Informazioni Personali:</h2>
                                    <div className="flex mb-5">
                                        <div className="flex justify-center items-center min-w-32 h-32 relative bg-white rounded-[50%] shadow my-14 ml-14 mr-16 dark:bg-elements_dark dark:shadow-slate-400">
                                            <img className='imgProfile' src="https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" />
                                            <div className="relative">
                                                <div className="flex justify-center items-center absolute w-10 h-10 -bottom-16 right-1 cursor-pointer bg-primayColor rounded-[50%] btn-tooltip">
                                                    <i className="fa-solid fa-pen text-white"></i>
                                                    <div className="tooltip-container tooltip-bottom">
                                                        Modifica
                                                        <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-around">
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="first_name" className="font-semibold mt-1 dark:text-slate-300">Nome</label>
                                                <input type="text" name="first_name" id="first_name" onInput={handleInput} value={form.personal.first_name} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="last_name" className="font-semibold mt-1 dark:text-slate-300">Cognome</label>
                                                <input type="text" name="last_name" id="last_name" onInput={handleInput} value={form.personal.last_name} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="tel" className="font-semibold mt-1 dark:text-slate-300">Numero di Telefono</label>
                                                <input type="text" name="tel" id="tel" onInput={handleInput} value={form.personal.tel} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="birth_date" className="font-semibold mt-1 dark:text-slate-300">Data Nascita</label>
                                                <input type="date" name="birth_date" id="birth_date" onInput={handleInput} value={form.personal.birth_date} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="nation" className="font-semibold mt-1 dark:text-slate-300">Nazione</label>
                                                <input type="text" name="nation" id="nation" onInput={handleInput} value={form.personal.nation} className="my-2 p-2 input_field" />
                                            </div>
                                            <div className="flex flex-col w-2/5">
                                                <label htmlFor="city" className="font-semibold mt-1 dark:text-slate-300">Città</label>
                                                <input type="text" name="city" id="city" onInput={handleInput} value={form.personal.city} className="my-2 p-2 input_field" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="bio" className="font-semibold mt-1 dark:text-slate-300">Biografia</label>
                                        <textarea name="bio" id="bio" onInput={handleInput} value={form.personal.bio} placeholder="Racconta qualcosa di te..." className="my-2 p-2 input_field"></textarea>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tabToOpen == activeTab.changePassword && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">Cambio Password</h2>
                                    <div className="flex justify-around gap-5">
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="current-password" className="font-semibold mt-2 dark:text-slate-300">Password Attuale</label>
                                            <input type="password" name="current_password" id="current-password" onInput={handleInput} value={form.password.current_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="new-password" className="font-semibold mt-2 dark:text-slate-300">Nuova Password</label>
                                            <input type="password" name="new_password" id="new-password" onInput={handleInput} value={form.password.new_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                            <label htmlFor="conf_password" className="font-semibold mt-2 dark:text-slate-300">Conferma Password</label>
                                            <input type="password" name="conf_password" id="conf_password" onInput={handleInput} value={form.password.conf_password} placeholder="........" className="my-2 p-2 input_field" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tabToOpen == activeTab.manageNickname && (
                                <div>
                                    <h2 className="text-lg mb-6 dark:text-slate-100">Gestisci Nickname</h2>
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
                                    <h2 className="text-lg mb-6 dark:text-slate-100">Gestisci Contatti</h2>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col w-1/2">
                                            <label htmlFor="email" className="font-semibold mt-1 dark:text-slate-300">Indirizzo Email</label>
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
                                Salva
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default EditProfile