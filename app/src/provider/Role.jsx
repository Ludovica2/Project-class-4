import { createContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLastUserRole } from "../store/slices/settingsSlice";

export const RoleContext = createContext();

export const RoleProvider = ({children}) => {
    const lastRole = localStorage.getItem("lastUserRole");

    const setLastRole = (newValue) => {
        localStorage.setItem("lastUserRole", newValue);
    }

    return (
        <RoleContext.Provider value={[lastRole, setLastRole]}>
            {children}
        </RoleContext.Provider>
    )
}

