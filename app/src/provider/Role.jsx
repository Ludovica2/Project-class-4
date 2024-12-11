import { createContext, useRef } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({children}) => {
    const lastRole = useRef(null);

    const setLastRole = (newValue) => {
        lastRole.current = newValue;
    }

    return (
        <RoleContext.Provider value={[lastRole, setLastRole]}>
            {children}
        </RoleContext.Provider>
    )
}

