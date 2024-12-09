import { useEffect, useRef, useState } from "react"

export const useClickOutside = (initialState = false, options = { mouseEvent: "mouseup" }) => {
    options = { mouseEvent: "mouseup", ...options };

    const [active, setActive] = useState(initialState);
    const elRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(elRef.current && !elRef.current.contains(e.target) && active) setActive(false)
        }

        document.addEventListener(options.mouseEvent, handleClickOutside)
        return () => {
            document.removeEventListener(options.mouseEvent, handleClickOutside)
        }
    }, [active])

    return {
        active, setActive, elRef
    }
}