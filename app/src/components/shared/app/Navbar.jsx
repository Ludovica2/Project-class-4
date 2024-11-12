import { useDispatch } from "react-redux"
import { logout } from "../../../store/slices/authSlice";
import foundLogoFull from "../../../../public/images/FoundLogoFull.png";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="flex justify-between items-center h-[50px] pr-[20px] mt-1">
            <div className="pl-4">
                <img src={foundLogoFull} alt="Logo Found" className="h-[40px] w-auto" />
            </div>


            <form className="w-96 mx-auto">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 pr-1">
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50" placeholder="Searched and Found!" required />
                    <button type="submit" className="btn">Search</button>
                </div>
            </form>


            <div>
                <button onClick={handleLogout} className="btn">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar