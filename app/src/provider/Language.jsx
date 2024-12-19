import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import languages from "../config/languages";
import { setLang } from "../store/slices/settingsSlice";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { lang } = useSelector((state) => state.settings);

    const setCurrentLang = (newValue) => {
        dispatch(setLang(typeof newValue == "function" ? newValue(lang) : newValue));
    }

    return (
        <LanguageContext.Provider value={[lang, setCurrentLang]}>
            {children}
        </LanguageContext.Provider>
    )
}

/**
 * @returns {[languages["it"], (lang: string) => {}]}
 */
export const useDictionary = () => {
    const [lang, setLang] = useContext(LanguageContext);

    return [
        languages[lang],
        setLang,
        lang,
    ]
}