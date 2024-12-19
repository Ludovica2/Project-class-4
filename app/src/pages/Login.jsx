import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SDK from "../SDK";
import { useLastRole } from "../hooks/useLastRole";
import { useDictionary } from "../provider/Language";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { darkMode} = useSelector((state) => state.settings);
    const [_, setLastRole] = useLastRole();
    const [dictionary] = useDictionary();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await SDK.auth.login(form);
            dispatch(login(data));
            setLastRole("user");
            navigate("/app/feed");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        document.title = "Found!";
    }, [])

    return (
        <>
            <div className="relative mt-6 lg:mt-20">
                {
                    darkMode ? 
                        <img src="/images/FoundPlaneDark.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10 max-xs:hidden" />
                    : 
                        <img src="/images/FlyngAirplane.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10 max-xs:hidden" />
                }
                <div className="flex justify-center">
                    <div className="flex flex-col w-w_450 2xl:w-w_500 mt-4 p-4 bg-white border border-gray-300 rounded-md dark:bg-elements_dark max-xs:w-80 max-xxs:border-none">
                        <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600 text-dark">{dictionary.login.WELCOME_USER}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold mt-1 dark:text-slate-300">{dictionary.globals.EMAIL}</label>
                                <input type="email" name="email" id="email" value={form.email} onInput={handleInput} placeholder={dictionary.globals.PH_EMAIL} className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="font-semibold mt-2 dark:text-slate-300">Password</label>
                                <input type="password" name="password" id="password" value={form.password} onInput={handleInput} placeholder="Password" className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex justify-between my-4">
                                <span><Link to={"/forgot-password"} className="link">{dictionary.login.FORGET_PW}</Link></span>
                            </div>
                            <div>
                                <button type="submit" className="w-full my-3 p-2 border bg-primaryColor text-white rounded-md  hover:bg-primaryColor_Hover hover:border hover:border-primaryColor_Border_Hover">{dictionary.btn.LOGIN}</button>
                            </div>
                        </form>
                        <div className="mt-5 mb-4 text-center">
                            <p className="text-dark">{dictionary.login.REGISTER} <Link to={"/signup"} className="link">{dictionary.btn.SUBSCRIBE}!</Link></p>
                        </div>
                        <div className="mt-6 mx-5">
                            <span className="block h-px mb-4 bg-gray-300"></span>
                            <p className="font-semibold mb-1 dark:text-slate-300">{dictionary.login.REDIRECT_BUSINESS} </p>
                            <p className="mb-2 text-dark"> {dictionary.btn.LOGIN} <Link to={"/login-business"} className="link">Found! Business</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login