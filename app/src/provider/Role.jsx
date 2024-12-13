import { createContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLastUserRole } from "../store/slices/settingsSlice";

export const RoleContext = createContext();

export const RoleProvider = ({children}) => {
    const dispatch = useDispatch();
    const lastRole = useSelector((state) => state.settings.lastUserRole);

    const setLastRole = (newValue) => {
        dispatch(changeLastUserRole(newValue));
    }

    return (
        <RoleContext.Provider value={[lastRole, setLastRole]}>
            {children}
        </RoleContext.Provider>
    )
}

