import { useEffect, useState } from "react"
import { buildAuthUrl } from "../config/confing";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/request";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, error, request: loginRequest } = useRequest(buildAuthUrl("/token"), { method: "POST", enableCache: false });

    const [form, setForm] = useState({
        email: "ilaria.mammana@gmail.com",
        password: "1234"
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginRequest({ data: { ...form } });
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (data) {
            dispatch(login(data));
            navigate("/app/");
        }

        document.title = "Found!";

    }, [data, error])

    return (
        <>
            <div className="relative">
                <img src="/images/FlyngAirplane.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10" />
                <div className="flex justify-center">
                    <div className="flex flex-col w-w_450 2xl:w-w_500 min-w-96 mt-4 p-4 bg-white border border-gray-300 rounded-md">
                        <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600">Benvenuto su Found!, la piattaforma ideale per programmare al meglio i tuoi viaggi</p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold mt-1">Indirizzo Email</label>
                                <input type="email" name="email" id="email" value={form.email} onInput={handleInput} placeholder="Inserisci Email" className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="font-semibold mt-2">Password</label>
                                <input type="password" name="password" id="password" value={form.password} onInput={handleInput} placeholder="Password" className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex justify-between my-4">
                                <div>
                                    <input type="checkbox" name="rememberme" id="rememberme" />
                                    <label htmlFor="rememberme" className="font-semibold mt-1"> Resta Connesso </label>
                                </div>
                                <span><Link to={"/forgotpassword"} className="link">Password Dimenticata?</Link></span>
                            </div>
                            <div>
                                <button type="submit" className="w-full my-3 p-2 border bg-primayColor text-white rounded-md  hover:bg-primayColor_Hover hover:border hover:border-primayColor_Border_Hover">Login</button>
                            </div>
                        </form>
                        <div className="mt-5 mb-4 text-center">
                            <p>Non hai ancora un account? <Link to={"/signup"} className="link">Registrati!</Link></p>
                        </div>
                        <div className="mt-6 mx-5">
                            <span className="block h-px mb-4 bg-gray-300"></span>
                            <p className="font-semibold mb-1">Sei un'azienda? </p>
                            <p className="mb-2"> Prova il nostro <Link to={"/loginbusiness"} className="link">Found! Business</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login