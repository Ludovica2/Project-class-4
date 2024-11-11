import { useEffect } from "react"

const Favorites = () => {
    useEffect(() => {
        document.title = "Favorites - Found!";
}, []);
return (
    <>
        <h1>Favorites</h1>
        <p>hello world</p>
    </>
)
}

export default Favorites