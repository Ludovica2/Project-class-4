import { motion } from "framer-motion"
import { useState } from "react";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const SettingsProfile = () => {
    const [isOnDark, setIsOnDark] = useState(false);
    const [isOnNotify, setIsOnNotify] = useState(false);
    const [isOnInstagram, setIsOnInstagram] = useState(false);

    const toggleSwitchDark = () => setIsOnDark(!isOnDark);
    const toggleSwitchNotify = () => setIsOnNotify(!isOnNotify);
    const toggleSwitchInstagram = () => setIsOnInstagram(!isOnInstagram);

    return (
        <>
            <div className="flex flex-col gap-4 w-full max-w-[1280px] lg:max-w-[1320px]">
                <div className="flex bg-white rounded-lg shadow m-5 p-6">
                    <form className="w-full" /* onSubmit={handleSignIn} */>
                        <div className="flex justify-between">
                            <div className="w-11/12">
                                <h2 className="text-lg mt-1 mb-6">Imopostazioni Account:</h2>
                                <div className="flex w-3/4 justify-between mb-6">
                                    <span >Lingua</span>
                                    <div>
                                        <label htmlFor="lang-it" className="mt-1"> IT </label>
                                        <input type="checkbox" name="lang-it" id="lang-it" className="outline-none" />
                                        <label htmlFor="lang-eng" className="mt-1"> ENG </label>
                                        <input type="checkbox" name="lang-eng" id="lang-eng" />
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-6">
                                    <span className="mt-1"> Tema </span>
                                    <div className="switch" data-ison={isOnDark} onClick={toggleSwitchDark}>
                                        <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnDark ? " bg-primayColor" : " bg-white")} layout transition={spring} />
                                    </div>
                                </div>
                                <div className="flex items-center w-3/4 justify-between mb-6">
                                    <span className="mt-1"> Notifiche </span>
                                    <div className="switch" data-ison={isOnNotify} onClick={toggleSwitchNotify}>
                                        <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnNotify ? " bg-primayColor" : " bg-white")} layout transition={spring} />
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-6">
                                    <span >Autorizzazioni Dispositivo</span>
                                    <div>
                                        <button>
                                            <i className="fa-regular fa-circle-right text-primayColor"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-6">
                                    <span>Utenti Bloccati</span>
                                    <div>
                                        <button>
                                            <i className="fa-regular fa-circle-right text-primayColor"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex w-3/4 justify-between mb-6">
                                    <span >Assistenza</span>
                                    <div>
                                        <button>
                                            <i className="fa-regular fa-circle-right text-primayColor"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-7 border border-slate-200"></div>
                            <div className="w-11/12">
                                <h2 className="text-lg mt-1 mb-6">Altri Social:</h2>
                                <div className="flex items-center w-3/4 justify-between mb-6">
                                    <label className="mt-1"> Instagram </label>
                                    <div className="switch" data-ison={isOnInstagram} onClick={toggleSwitchInstagram}>
                                        <motion.div className={"w-5 h-5 rounded-[40px]" + (isOnInstagram ? " bg-primayColor" : " bg-white")} layout transition={spring} />
                                    </div>
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