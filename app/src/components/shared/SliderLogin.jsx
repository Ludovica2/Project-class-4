import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SliderLogin = () => {
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={40}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay]}
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
        </>
    )
}

export default SliderLogin