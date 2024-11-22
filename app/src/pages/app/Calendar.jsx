import { useEffect } from "react"

const Calendar = () => {
    useEffect(() => {
        document.title = "Calendar - Found!";
    }, []);
    return (
        <>
         <h2>Calendar</h2>
        </>
    )
}

export default Calendar