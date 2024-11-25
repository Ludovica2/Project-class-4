import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SliderLogin from "../components/shared/SliderLogin";

const LoginBusiness = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await SDK.auth.login(form);
            dispatch(login(data));
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
            <div className="relative flex h-full">
                <div className="flex justify-center items-center w-1/2 bg-primayColor">
                    <div className="flex justify-center items-center drag-area"></div>
                    <div className="w-96 overflow-hidden z-10 images-container">
                        <SliderLogin />
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/2 pt-9 pb-11 max-h-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col w-w_450 2xl:w-w_500 min-w-96 mt-4 p-4 bg-white border border-gray-300 rounded-md">
                            <img src="/images/FoundLogoBusiness.png" alt="logo-business" className="logo-login flex self-center mb-3" />
                            <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600">Benvenuto su Found!Business, la piattaforma ideale per promuovere la tua impresa</p>
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
                                    </div>
                                    <span><Link to={"/forgot-password"} className="link">Password Dimenticata?</Link></span>
                                </div>
                                <div>
                                    <button type="submit" className="w-full my-3 p-2 border bg-primayColor text-white rounded-md  hover:bg-primayColor_Hover hover:border hover:border-primayColor_Border_Hover">Login</button>
                                </div>
                            </form>
                            <div className="mt-5 mb-4 text-center">
                                <p>Non hai ancora un Account? Prova il nostro <Link to={"/signup-business"} className="link">Found! Business</Link></p>
                            </div>
                            <div className="mt-6 mx-5">
                                <span className="block h-px mb-4 bg-gray-300"></span>
                                <p className="font-semibold mb-1">Non sei un'azienda? </p>
                                <p className="mb-2">
                                    <Link to={"/"} className="link">Accedi</Link>
                                </p>
                                <p className="font-semibold mb-1">Hai bisogno di aiuto? </p>
                                <p className="mb-2">
                                    <Link className="link">Contattaci</Link>
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