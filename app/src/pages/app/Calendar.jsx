import { useEffect } from "react"

const Calendar = () => {
    useEffect(() => {
        document.title = "Calendar - Found!";
}, []);
return (
    <>
        <h1>Calendar</h1>
        <p>hello world</p>
    </>
)
}

export default Calendar