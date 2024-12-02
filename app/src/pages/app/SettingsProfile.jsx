import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/shared/PopUpModal";
import SupportTicket from "../../components/SupportTicket";
import ButtonBack from "../../components/ButtonBack";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const SettingsProfile = () => {
    const [isOnDark, setIsOnDark] = useState(false);
    const [isOnNotify, setIsOnNotify] = useState(false);
    const [popupIsOpen, setpopupIsOpen] = useState(false);
    const [isOnCamera, setIsOnCamera] = useState(false);
    const [isOnContact, setIsOnContact] = useState(false);
    const [isOnPosition, setIsOnPosition] = useState(false);
    const [isOnMicro, setIsOnMicro] = useState(false);
    const [isOnGallery, setIsOnGallery] = useState(false);

    /* Social */
    const [isOnInstagram, setIsOnInstagram] = useState(false);
    const [isOnFacebook, setIsOnFacebook] = useState(false);
    const [isOnTikTok, setIsOnTikTok] = useState(false);
    const [isOnThreads, setIsOnThreads] = useState(false);
    const [isOnYouTube, setIsOnYouTube] = useState(false);
    const [isOnPinterest, setIsOnPinterest] = useState(false);
    const [isOnTwitter, setIsOnTwitter] = useState(false);
    const [isOnLinkedin, setIsOnLinkedin] = useState(false);

    const toggleSwitchDark = () => {
        document.body.classList.toggle("dark");
        setIsOnDark(!isOnDark)
    };
    const toggleSwitchNotify = () => setIsOnNotify(!isOnNotify);
    const toggleSwitchInstagram = () => setIsOnInstagram(!isOnInstagram);
    const toggleSwitchFacebook = () => setIsOnFacebook(!isOnFacebook);
    const toggleSwitchTikTok = () => setIsOnTikTok(!isOnTikTok);
    const toggleSwitchThreads = () => setIsOnThreads(!isOnThreads);
    const toggleSwitchYouTube = () => setIsOnYouTube(!isOnYouTube);
    const toggleSwitchPinterest = () => setIsOnPinterest(!isOnPinterest);
    const toggleSwitchTwitter = () => setIsOnTwitter(!isOnTwitter);
    const toggleSwitchLinkedin = () => setIsOnLinkedin(!isOnLinkedin);

    const toggleSwitchCamera = () => setIsOnCamera(!isOnCamera);
    const toggleSwitchContact = () => setIsOnContact(!isOnContact);
    const toggleSwitchPosition = () => setIsOnPosition(!isOnPosition);
    const toggleSwitchMicro = () => setIsOnMicro(!isOnMicro);
    const toggleSwitchGallery = () => setIsOnGallery(!isOnGallery);

    const openPopup = (event) => {
        event.preventDefault();
        setpopupIsOpen((popupIsOpen) => !popupIsOpen);
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[1280px] lg:max-w-[1320px]">
                <ButtonBack to={"/app/profile"} />
                <div className="flex bg-white rounded-lg shadow m-5 p-6 dark:bg-elements_dark dark:shadow-slate-600">
                    <form className="w-full" /* onSubmit={handleSignIn} */>
                        <div className="flex justify-between">
                            <div className="w-11/12">
                                <h2 className="text-lg mt-1 mb-6 dark:text-slate-100">Imopostazioni Account:</h2>
                                <div className="flex w-3/4 justify-between mb-8">
                                    <label htmlFor="lang" className="mt-1 text-dark"> Lingua </label>
                                    <div>
                                        <select id="lang" className="input_field ">
                                            <option value="it" className=" dark:text-slate-300">Italiano</option>
                                            <option value="eng" className=" dark:text-slate-300">Inglese</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-8">
                                    <span className="text-dark"> Tema </span>
                                    <div className="switch dark:bg-zinc-600" data-ison={isOnDark} onClick={toggleSwitchDark}>
                                        <motion.div className={"w-5 h-5 rounded-[40px] flex justify-center items-center" + (isOnDark ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring}>
                                            {
                                                isOnDark ? <i className="fa-solid fa-moon text-slate-100"></i> : <i className="fa-solid fa-sun text-yellow-400"></i>
                                            }   
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-8">
                                    <span className="text-dark"> Notifiche </span>
                                    <div className="switch dark:bg-zinc-600" data-ison={isOnNotify} onClick={toggleSwitchNotify}>
                                        <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnNotify ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8">
                                    <span className="text-dark">Autorizzazioni Dispositivo</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Autorizzazioni Dispositivo"} sizeModal={"md"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primayColor"></i>
                                                    </div>;
                                                }}
                                            >
                                                {
                                                    <>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Fotocamera </span>
                                                            <div className="switch dark:bg-zinc-600" data-ison={isOnCamera} onClick={toggleSwitchCamera}>
                                                                <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnCamera ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Contatti </span>
                                                            <div className="switch dark:bg-zinc-600" data-ison={isOnContact} onClick={toggleSwitchContact}>
                                                                <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnContact ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Posizione </span>
                                                            <div className="switch dark:bg-zinc-600" data-ison={isOnPosition} onClick={toggleSwitchPosition}>
                                                                <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnPosition ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Microfono </span>
                                                            <div className="switch dark:bg-zinc-600" data-ison={isOnMicro} onClick={toggleSwitchMicro}>
                                                                <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnMicro ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between mb-8">
                                                            <span className="text-dark"> Galleria </span>
                                                            <div className="switch dark:bg-zinc-600" data-ison={isOnGallery} onClick={toggleSwitchGallery}>
                                                                <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnGallery ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </PopUpModal>
                                        }
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-8">
                                    <span className="text-dark">Utenti Bloccati</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Utenti Bloccati"} sizeModal={"md"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primayColor"></i>
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
                                <div className="flex w-3/4 justify-between mb-8">
                                    <span className="text-dark">Assistenza</span>
                                    <div>
                                        {
                                            <PopUpModal title={"Ticket Aperti"} sizeModal={"5xl"}
                                                showBtn={(openModal) => {
                                                    return <div onClick={() => openModal(true)} className="cursor-pointer">
                                                        <i className="fa-regular fa-circle-right text-primayColor"></i>
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
                                <div className="flex w-3/4 justify-between mb-8">
                                    <span className="text-dark">Elimina Account</span>
                                    <div>
                                        <button onClick={openPopup} >
                                            <i className="fa-regular fa-circle-right text-primayColor"></i>
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
                                <h2 className="text-lg mt-1 mb-6 dark:text-slate-100">Altri Social:</h2>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Instagram </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnInstagram} onClick={toggleSwitchInstagram}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnInstagram ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnInstagram} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Facebook </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnFacebook} onClick={toggleSwitchFacebook}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnFacebook ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnFacebook} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> TikTok </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnTikTok} onClick={toggleSwitchTikTok}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnTikTok ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnTikTok} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Threads </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnThreads} onClick={toggleSwitchThreads}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnThreads ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnThreads} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> YouTube </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnYouTube} onClick={toggleSwitchYouTube}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnYouTube ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnYouTube} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Pinterest </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnPinterest} onClick={toggleSwitchPinterest}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnPinterest ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnPinterest} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Twitter </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnTwitter} onClick={toggleSwitchTwitter}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnTwitter ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnTwitter} />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex justify-between min-w-36">
                                        <label htmlFor="insta" className="mr-4 text-dark"> Linkedin </label>
                                        <div className="switch dark:bg-zinc-600" data-ison={isOnLinkedin} onClick={toggleSwitchLinkedin}>
                                            <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnLinkedin ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                                        </div>
                                    </div>
                                    <input type="text" name="insta" id="insta" className="min-w-80 input_readOnly" readOnly={!isOnLinkedin} />
                                </div>
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