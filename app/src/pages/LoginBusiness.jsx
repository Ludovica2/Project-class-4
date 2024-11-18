import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
                        <Swiper
                           spaceBetween={30}
                           centeredSlides={true}
                           autoplay={{
                             delay: 2500,
                             disableOnInteraction: false,
                           }}
                        >
                            <SwiperSlide>
                                <img src="/images/3.jpg" alt="community-business" className="max-h-64 rounded-md" />
                                <div className="m-6">
                                    <h2 className="text-center text-white text-xl mb-3 font-bold">Pubblicizza la tua impresa</h2>
                                    <p className="text-center text-white">Tramite la community potrai raggiungere ogni parte del mondo grazie al passa parola</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://images.pexels.com/photos/4878011/pexels-photo-4878011.jpeg" alt="events-business" className=" rounded-md" />
                                <div className="m-6">
                                    <h2 className="text-center text-white text-xl mb-3 font-bold">Promuovi i tuoi eventi</h2>
                                    <p className="text-center text-white">Con Found! Business sarà molto facile pubblicizzare i tuoi eventi</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://images.pexels.com/photos/6214965/pexels-photo-6214965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="feedback-business" className=" rounded-md" />
                                <div className="m-6">
                                    <h2 className="text-center text-white text-xl mb-3 font-bold">Ricevi i feedback</h2>
                                    <p className="text-center text-white">Ogni utente potrà parlare di te e lasciare una recensione</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
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
                                <p className="font-semibold mb-1">Hai bisogno di aiuto? </p>
                                <p className="mb-2">
                                    <Link className="link">Contattaci</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="relative">
                <img src="/images/5.jpg" alt="img-business" className="img_bg-business"/>
                <div className="flex justify-center">
                    <div className="flex flex-col w-w_450 2xl:w-w_500 min-w-96 mt-4 p-4 bg-white border border-gray-300 rounded-md">
                        <img src="/images/FoundLogoBusiness.png" alt="logo-business" className="logo-login flex self-center mb-3"/>
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
                            <p className="font-semibold mb-1">Hai bisogno di aiuto? </p>
                            <p className="mb-2">
                                <Link className="link">Contattaci</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default LoginBusiness