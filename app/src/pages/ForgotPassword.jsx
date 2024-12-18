import { useState, useEffect } from "react"

function ForgotPassword() {
    const [email ,setEmail] = useState("");

    const handleInput = (e) => {
        setForm(e.target.value);
    }

    const handleReset = async (e) => {
        e.preventDefault();


    }

    useEffect(() => {
        document.title = "Recupero Password - Found!";
    }, []);

    return (
        <>
            <div className="flex justify-center pb-20">
                <div className="flex flex-col w-w_450 2xl:w-w_500 mt-4 p-4 border border-gray-300 rounded-md max-xs:w-80 max-xxs:border-none">
                    <p className="mx-4 mt-3 mb-8 px-4 text-center text-gray-600">Inserisci il tuo indirizzo email, ti invieremo le istruzioni per resettare la tua password </p>
                    <form onSubmit={handleReset}>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold mt-1">Indirizzo Email</label>
                            <input type="email" name="email" id="email" onInput={handleInput} placeholder="Inserisci Email" className="my-2 p-2 input_field" />
                        </div>
                        <div>
                            <button type="submit" className="my-3 p-2 border bg-primaryColor text-white rounded-md  hover:bg-primaryColor_Hover hover:border hover:border-primaryColor_Border_Hover">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword