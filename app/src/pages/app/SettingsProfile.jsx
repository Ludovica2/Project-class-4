import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion, steps } from "framer-motion"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/shared/PopUpModal";
import SupportTicket from "../../components/SupportTicket";
import ButtonBack from "../../components/ButtonBack";
import { useDispatch, useSelector } from "react-redux";
import { changeDeviceSettings, changeSocialSettings, toggleDarkMode, toggleNotify } from "../../store/slices/settingsSlice";
import CustomSlideInput from "../../components/shared/CustomSlideInput";
import { useDictionary } from "../../provider/Language";
import { availableLanguages } from "../../config/languages";
import SDK from "../../SDK";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const SettingsProfile = () => {
    const dispatch = useDispatch();
    const [dictionary, setLang, lang] = useDictionary();
    const { token } = useSelector((state) => state.auth);
    const { darkMode, notify, social: socialSettings, device: deviceSettings } = useSelector((state) => state.settings);
    const [popupIsOpen, setpopupIsOpen] = useState(false);

    const saveSettingsUpdates = async (payload) => {
        try {
            await SDK.settings.update(payload, token);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSocialSettingsChange = (payload) => {
        dispatch(changeSocialSettings(payload));
        saveSettingsUpdates({ social: { ...socialSettings, ...payload } });
    };
    
    const handleDeviceSettingsChange = (payload) => {
        dispatch(changeDeviceSettings(payload));
        saveSettingsUpdates({ device: { ...deviceSettings, ...payload } });
    };

    const toggleSwitchDark = () => {
        saveSettingsUpdates({ darkMode: !darkMode });
        dispatch(toggleDarkMode());
    };

    const toggleSwitchNotify = () => {
        saveSettingsUpdates({ notify: !notify });
        dispatch(toggleNotify());
    };

    const openPopup = (event) => {
        event.preventDefault();
        setpopupIsOpen((popupIsOpen) => !popupIsOpen);
    }

    const handleChangeLanguage = (event) => {
        setLang(event.target.value);
        saveSettingsUpdates({ lang: event.target.value });
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[1280px] lg:max-w-[1320px]">
                <ButtonBack to={"/app/profile"} />
                <div className="flex bg-white rounded-lg shadow m-5 p-6 dark:bg-elements_dark dark:shadow-slate-600">
                    <form className="w-full" /* onSubmit={handleSignIn} */>
                        <div className="flex justify-between">
                            <div className="w-11/12">
                                <h2 className="text-lg mt-1 mb-6 dark:text-slate-100">{dictionary.settings.TITLE_ACCOUNT}:</h2>
                                <div className="flex w-3/4 justify-between mb-8 max-xl:w-full">
                                    <label htmlFor="lang" className="mt-1 text-dark"> Lingua </label>
                                    <div>
                                        <select id="lang" name="lang" value={lang} onChange={handleChangeLanguage} className="input_field ">
                                            {
                                                availableLanguages.map(({ lang, label }) => (
                                                    <option key={lang} value={lang} className=" dark:text-slate-300">{label}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark"> Tema </span>
                                    <div className="switch dark:bg-zinc-600" data-ison={darkMode} onClick={toggleSwitchDark}>
                                        <motion.div className={"w-5 h-5 rounded-[40px] flex justify-center items-center" + (darkMode ? " bg-primaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring}>
                                            {
                                                darkMode ? <i className="fa-solid fa-moon text-slate-100"></i> : <i className="fa-solid fa-sun text-yellow-400"></i>
                                            }
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark"> Notifiche </span>
                                    <div className="switch dark:bg-zinc-600" data-ison={notify} onClick={toggleSwitchNotify}>
                                        <motion.div className={"w-5 h-5 rounded-[40px]" + (notify ? " bg-primaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark">Autorizzazioni Dispositivo</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Autorizzazioni Dispositivo"} sizeModal={"md"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primaryColor"></i>
                                                    </div>;
                                                }}
                                            >
                                                {
                                                    <>
                                                        {
                                                            Object.entries(deviceSettings).map(([name, props]) => (
                                                                <CustomSlideInput key={name} name={name} {...props} onChange={handleDeviceSettingsChange} social={false} />
                                                            ))
                                                        }
                                                    </>
                                                }
                                            </PopUpModal>
                                        }
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark">Utenti Bloccati</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Utenti Bloccati"} sizeModal={"md"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primaryColor"></i>
                                                    </div>;
                                                }}
                                            >
                                                {
                                                    <>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Nessun Utente Bloccato </span>
                                                        </div>
                                                    </>
                                                }
                                            </PopUpModal>
                                        }
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark">Assistenza</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Ticket Aperti"} sizeModal={"5xl"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primaryColor"></i>
                                                    </div>;
                                                }}
                                            >
                                                {
                                                    <SupportTicket tickets={[{
                                                        id: 1,
                                                        description: "Non aggiorna il feed",
                                                        date: "28/11/2024",
                                                        category: "Bacheca",
                                                        state: "Presa in carico"
                                                    }]}></SupportTicket>
                                                }
                                            </PopUpModal>
                                        }
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8 max-xl:w-full">
                                    <span className="text-dark">Elimina Account</span>
                                    <div>
                                        <button onClick={openPopup} >
                                            <i className="fa-regular fa-circle-right text-primaryColor"></i>
                                        </button>
                                        <Modal show={popupIsOpen} size="md" onClose={openPopup} popup>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 stroke-slate-400" />
                                                    <h3 className="mb-5 text-lg dark:text-slate-100">
                                                        Sei sicuro di voler eliminare l'account?
                                                    </h3>
                                                    <div className="flex justify-center gap-4">
                                                        <motion.button type="submit" className="btn"
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            Elimina Account
                                                        </motion.button>
                                                        <motion.button type="submit" onClick={openPopup} className="px-4 py-2 end-2.5 bottom-2.5 font-medium border rounded-lg  hover:bg-slate-200 dark:text-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500"
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            Annulla
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-7 border border-slate-200 dark:border-slate-500"></div>
                            <div className="w-11/12">
                                <h2 className="text-lg mt-1 mb-6 dark:text-slate-100">{dictionary.settings.TITLE_SOCIAL}:</h2>
                                {
                                    Object.entries(socialSettings).map(([name, props]) => (
                                        <CustomSlideInput key={name} name={name} {...props} onChange={handleSocialSettingsChange} social={true} />
                                    ))
                                }
                            </div>
                        </div>
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

export default SettingsProfile