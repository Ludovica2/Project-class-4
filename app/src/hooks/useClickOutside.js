import { useEffect, useRef, useState } from "react"

export const useClickOutside = (initialState = false) => {
    const [active, setActive] = useState(initialState);
    const elRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(elRef.current && !elRef.current.contains(e.target) && active) setActive(false)
        }

        document.addEventListener("mouseup", handleClickOutside)
        return () => {
            document.removeEventListener("mouseup", handleClickOutside)
        }
    }, [active])

    return {
        active, setActive, elRef
    }
}