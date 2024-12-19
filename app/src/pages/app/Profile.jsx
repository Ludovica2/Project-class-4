import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ExternalProfile from "./ExternalProfile";
import InternalProfile from "./InternalProfile";


const Profile = ({ isExternal = false }) => {
    const { nickname } = useParams();
    const [nick, setNick] = useState(nickname);

    useEffect(() => {
        document.title = "Profile - Found!";
    }, []);

    return (
        <>
            {
                nick ? <ExternalProfile nickname={nick} /> : <InternalProfile />
            }
        </>
    )
}

export default Profile