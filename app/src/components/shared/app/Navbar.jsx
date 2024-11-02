import { useDispatch } from "react-redux"
import { logout } from "../../../store/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="flex justify-between items-center h-[50px] pr-[20px]">
            <div className="pl-4">
                <h3 className="font-bold">TripSocial</h3>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar