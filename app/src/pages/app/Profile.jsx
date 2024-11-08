import { useEffect } from "react"

const Profile = () => {
    useEffect(() => {
        document.title = "Profile - Found!";
}, []);
return (
    <>
        <h1>Profile</h1>
        <p>hello world</p>
    </>
)
}

export default Profile