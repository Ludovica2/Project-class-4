import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SliderLogin from "../components/shared/SliderLogin";
import { toast } from "react-toastify";
import SDK from "../SDK";
import { login } from "../store/slices/authSlice";
import { useLastRole } from "../hooks/useLastRole";
import { useDictionary } from "../provider/Language";

const LoginBusiness = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dictionary] = useDictionary();
    const { darkMode} = useSelector((state) => state.settings);
    const [_, setLastRole] = useLastRole();
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
            const data = await SDK.auth.loginBusiness(form);
            dispatch(login(data));
            setLastRole("business");
            navigate("/app/feed");
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        document.title = "Found!Business";
    }, [])

    return (
        <>
            <div className="relative flex h-full max-lg:flex-col">
                <div className="flex justify-center items-center w-1/2 bg-primaryColor max-lg:w-full max-xs:hidden">
                    <div className="flex justify-center items-center drag-area max-lg:top-[15%] max-lg:left-[50%]"></div>
                    <div className="w-96 overflow-hidden z-10 images-container max-lg:mt-4">
                        <SliderLogin />
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/2 pt-9 pb-11 max-h-full max-lg:w-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col w-w_450 2xl:w-w_500 mt-4 p-4 bg-white border border-gray-300 rounded-md dark:bg-elements_dark max-xs:w-80 max-xxs:border-none">
                            <img src={ darkMode? "/images/LogoBusinessDark.png" : "/images/FoundLogoBusiness.png"} alt="logo-business" className="logo-login flex self-center mb-3" />
                            <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600 text-dark">{dictionary.login.WELCOME_BUSINESS}</p>
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
                                    <div>
                                    </div>
                                    <span><Link to={"/forgot-password"} className="link">{dictionary.login.FORGET_PW}</Link></span>
                                </div>
                                <div>
                                    <button type="submit" className="w-full my-3 p-2 border bg-primaryColor text-white rounded-md  hover:bg-primaryColor_Hover hover:border hover:border-primaryColor_Border_Hover">{dictionary.btn.LOGIN}</button>
                                </div>
                            </form>
                            <div className="mt-5 mb-4 text-center">
                                <p className="text-dark">{dictionary.login.REGISTER} {dictionary.login.TRY} <Link to={"/signup-business"} className="link">Found! Business</Link></p>
                            </div>
                            <div className="mt-6 mx-5">
                                <span className="block h-px mb-4 bg-gray-300"></span>
                                <p className="font-semibold mb-1 dark:text-slate-300">{dictionary.login.NO_BUSINESS} </p>
                                <p className="mb-2">
                                    <Link to={"/"} className="link">{dictionary.btn.LOGIN}</Link>
                                </p>
                                <p className="font-semibold mb-1 dark:text-slate-300">{dictionary.login.HELP} </p>
                                <p className="mb-2">
                                    <Link className="link">{dictionary.login.CONTACT}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginBusiness