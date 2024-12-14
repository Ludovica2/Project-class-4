import { useEffect } from "react"
import { useParams } from "react-router-dom";
import ExternalProfile from "./ExternalProfile";
import InternalProfile from "./InternalProfile";


const Profile = ({ isExternal = false }) => {
    const externalUserNickname = isExternal ? useParams().nickname : null;

    useEffect(() => {
        document.title = "Profile - Found!";
    }, []);

    return (
        <>
            {
                externalUserNickname ? <ExternalProfile nickname={externalUserNickname} /> : <InternalProfile />
            }
        </>
    )
}

export default Profile