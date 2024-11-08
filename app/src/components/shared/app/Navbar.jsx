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
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Searched and Found!" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primayColor hover:bg-primayColor_Hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:primaryColor_Dark dark:primaryColor_Dark_Hover">Search</button>
                </div>
            </form>


            <div>
                <button onClick={handleLogout} className="text-white end-2.5 bottom-2.5 bg-primayColor hover:bg-primayColor_Hover focus:ring-4 focus:outline-none focus:[#68B684] font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:[ring-blue-800]">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar