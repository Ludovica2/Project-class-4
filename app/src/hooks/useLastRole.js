import { useContext } from "react"
import { RoleContext } from "../provider/Role"

export const useLastRole = () => {
    return useContext(RoleContext);
}