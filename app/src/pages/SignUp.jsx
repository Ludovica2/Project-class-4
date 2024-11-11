import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function SignUp() {
    const [form, setForm] = useState({
        nomeCompleto: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();


    }

    useEffect(() => {
        document.title = "Registrazione - Found!";
    }, []);

    return (
        <>
            <div className="relative">
                <img src="/images/FlyngAirplane.gif" alt="plane" className="gif-airplane max-w-w_1400 w-full -z-10" />
                <div className="flex justify-center">
                    <div className="flex flex-col w-w_450 2xl:w-w_500 min-w-96 mt-4 p-4 bg-white border border-gray-300 rounded-md">
                        <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600">Benvenuto su Found!, la piattaforma ideale per programmare al meglio i tuoi viaggi</p>
                        <form onSubmit={handleSignIn}>
                            <div className="flex flex-col">
                                <label htmlFor="nomecompleto" className="font-semibold mt-1">Nome Completo</label>
                                <input type="nomecompleto" name="nomecompleto" id="nomecompleto" onInput={handleInput} placeholder="Mario Rossi" className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold mt-1">Indirizzo Email</label>
                                <input type="email" name="email" id="email" onInput={handleInput} placeholder="mario.rossi@example.com" className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="font-semibold mt-2">Password</label>
                                <input type="password" name="password" id="password" onInput={handleInput} placeholder="...." className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confpassword" className="font-semibold mt-2">Conferma Password</label>
                                <input type="password" name="confpassword" id="confpassword" onInput={handleInput} placeholder="...." className="my-2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-primayColor" />
                            </div>
                            <div className="flex my-4">
                                <div>
                                    <input type="checkbox" name="accept" id="accept" />
                                    <label htmlFor="accept" className="mt-1"> Accetto i <span className="link">Termini & Condizioni</span> </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full my-3 p-2 border bg-primayColor text-white rounded-md  hover:bg-primayColor_Hover hover:border hover:border-primayColor_Border_Hover">Registrati</button>
                            </div>
                        </form>
                        <div className="mt-5 mb-4 text-center">
                            <p>Hai già un account? <Link to="/" className="link">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp