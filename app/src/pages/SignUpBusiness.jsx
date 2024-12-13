import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SDK from "../SDK";
import SliderLogin from "../components/shared/SliderLogin";
import { useSelector } from "react-redux";

const SignUpBusiness = () => {
    const navigate = useNavigate();
    const { darkMode} = useSelector((state) => state.settings);
    const [form, setForm] = useState({
        company_name: "",
        vat_number: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        conf_password: "",
        is_terms_accepted: "",
        role: "business"
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((form) => ({ ...form, [name]: type == "checkbox" ? checked : value }));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (form.password !== form.conf_password) {
            toast.error("Le due password non corrispondono");
            return;
        }

        try {
            const { conf_password, vat_number, company_name, ...payload } = form;

            await SDK.auth.registerBusiness({...payload, metadata: {vat_number, company_name}});
            toast.success("Utente registrato, puoi accedere al tuo nuovo account");
            navigate("/login-business");
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    useEffect(() => {
        document.title = "Registrazione - Found!Business";
    }, []);

    return (
        <>
            <div className="relative flex h-full max-lg:flex-col max-lg:justify-center">
                <div className="flex justify-center items-center w-1/2 bg-primayColor max-lg:w-full max-xs:hidden">
                    <div className="flex justify-center items-center drag-area max-lg:top-[15%] max-lg:left-[50%]"></div>
                    <div className="w-96 overflow-hidden z-10 images-container max-lg:mt-4">
                        <SliderLogin/>
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/2 pt-9 pb-11 max-h-full max-lg:w-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col w-w_450 2xl:w-w_500 mt-4 p-4 bg-white border border-gray-300 rounded-md dark:bg-elements_dark max-xs:w-80 max-xxs:border-none">
                            <img src={ darkMode? "/images/LogoBusinessDark.png" : "/images/FoundLogoBusiness.png"} alt="logo-business" className="logo-login flex self-center mb-3" />
                            <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600 text-dark">Benvenuto su Found!Business, la piattaforma ideale per promuovere la tua impresa</p>
                            <form onSubmit={handleSignIn}>
                                <div className="flex flex-col">
                                    <label htmlFor="company_name" className="font-semibold mt-1     dark:text-slate-300">Ragione Sociale</label>
                                    <input type="text" name="company_name" id="company_name" onInput={handleInput} value={form.company_name} placeholder="Azienda Srl" className="my-2 p-2 input_field" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="vat_number" className="font-semibold mt-1     dark:text-slate-300">Partita IVA</label>
                                    <input type="text" name="vat_number" id="vat_number" onInput={handleInput} value={form.vat_number} placeholder="45638679023" className="my-2 p-2 input_field" />
                                </div>
                                <div className="my-4 p-3 border border-gray-200 rounded-md relative">
                                    <span className="absolute left-4 -top-[11px] px-1 bg-white text-sm text-gray-400 dark:bg-elements_dark">Referente</span>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col max-w-[48%]">
                                            <label htmlFor="first_name" className="font-semibold mt-1     dark:text-slate-300">Nome</label>
                                            <input type="text" name="first_name" id="first_name" onInput={handleInput} value={form.first_name} placeholder="Mario" className="my-2 p-2 input_field" />
                                        </div>
                                        <div className="flex flex-col max-w-[48%]">
                                            <label htmlFor="last_name" className="font-semibold mt-1     dark:text-slate-300">Cognome</label>
                                            <input type="text" name="last_name" id="last_name" onInput={handleInput} value={form.last_name} placeholder="Rossi" className="my-2 p-2 input_field" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="font-semibold mt-1     dark:text-slate-300">Indirizzo Email</label>
                                    <input type="email" name="email" id="email" onInput={handleInput} value={form.email} placeholder="mario.rossi@example.com" className="my-2 p-2 input_field" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="font-semibold mt-2     dark:text-slate-300">Password</label>
                                    <input type="password" name="password" id="password" onInput={handleInput} value={form.password} placeholder="...." className="my-2 p-2 input_field" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="conf_password" className="font-semibold mt-2     dark:text-slate-300">Conferma Password</label>
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
                                <p className="text-dark">Hai già un Account Business? <Link to="/login-business" className="link">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpBusiness