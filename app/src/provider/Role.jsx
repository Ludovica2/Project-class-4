import { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({children}) => {
    const [lastRole, setLastRole] = useState(null);

    return (
        <RoleContext.Provider value={[lastRole, setLastRole]}>
            {children}
        </RoleContext.Provider>
    )
}

