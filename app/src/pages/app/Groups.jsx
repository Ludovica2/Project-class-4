import { useEffect } from "react"

const Groups = () => {
    useEffect(() => {
        document.title = "Groups - Found!";
}, []);
return (
    <>
        <h1>Groups</h1>
        <p>hello world</p>
    </>
)
}

export default Groups