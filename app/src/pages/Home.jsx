import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slices/authSlice";

const Home = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
            <h1>Home</h1>
            <div>
                <pre>
                    {JSON.stringify(auth, null, 2)}
                </pre>
            </div>
            {
                auth.token && <button onClick={handleLogout}>Logout</button>
            }
        </>
    )
}

export default Home