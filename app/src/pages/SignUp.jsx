import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SDK from "../SDK";
import { useSelector } from "react-redux";

function SignUp() {
    const navigate = useNavigate();
    const { darkMode} = useSelector((state) => state.settings);
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: "",
        is_terms_accepted: "",
        role: "user"
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((form) => ({ ...form, [name]: type == "checkbox" ? checked : value }));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (form.password !== form.conf_password) {
            toast.error("Le due password no ncorrispondono");
            return;
        }

        try {
            const { conf_password, ...payload } = form;

            await SDK.auth.register(payload);
            toast.success("Utente registrato, puoi accedere al tuo nuovo account");
            navigate("/");
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    useEffect(() => {
        document.title = "Registrazione - Found!";
    }, []);

    return (
        <>
            <div className="relative pb-20">
                {
                    darkMode ?
                        <img src="/images/FoundPlaneDark.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10 max-xs:hidden" />
                        :
                        <img src="/images/FlyngAirplane.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10 max-xs:hidden" />
                }
                <div className="flex justify-center">
                    <div className="flex flex-col w-w_450 2xl:w-w_500  mt-4 p-4 bg-white border border-gray-300 rounded-md dark:bg-elements_dark max-xs:w-80 max-xxs:border-none">
                        <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600 text-dark">Benvenuto su Found!, la piattaforma ideale per programmare al meglio i tuoi viaggi</p>
                        <form onSubmit={handleSignIn}>
                            <div className="flex flex-col">
                                <label htmlFor="first_name" className="font-semibold mt-1 dark:text-slate-300">Nome</label>
                                <input type="text" name="first_name" id="first_name" onInput={handleInput} value={form.first_name} placeholder="Mario" className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="last_name" className="font-semibold mt-1 dark:text-slate-300">Cognome</label>
                                <input type="text" name="last_name" id="last_name" onInput={handleInput} value={form.last_name} placeholder="Rossi" className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold mt-1 dark:text-slate-300">Indirizzo Email</label>
                                <input type="email" name="email" id="email" onInput={handleInput} value={form.email} placeholder="mario.rossi@example.com" className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="font-semibold mt-2 dark:text-slate-300">Password</label>
                                <input type="password" name="password" id="password" onInput={handleInput} value={form.password} placeholder="...." className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="conf_password" className="font-semibold mt-2 dark:text-slate-300">Conferma Password</label>
                                <input type="password" name="conf_password" id="conf_password" onInput={handleInput} value={form.conf_password} placeholder="...." className="my-2 p-2 input_field" />
                            </div>
                            <div className="flex my-4">
                                <div>
                                    <input type="checkbox" name="is_terms_accepted" id="is_terms_accepted" value={form.is_terms_accepted} onChange={handleInput} className="chk" required />
                                    <label htmlFor="accept" className="mt-1 text-dark"> Accetto i <span className="link">Termini & Condizioni</span> </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full my-3 p-2 border bg-primayColor text-white rounded-md  hover:bg-primayColor_Hover hover:border hover:border-primayColor_Border_Hover">Registrati</button>
                            </div>
                        </form>
                        <div className="mt-5 mb-4 text-center">
                            <p className="text-dark">Hai già un account? <Link to="/" className="link">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp