import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDictionary } from '../../provider/Language';

const SliderLogin = () => {
    const [dictionary] = useDictionary();

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
                        <h2 className="text-center text-white text-xl mb-3 font-bold">{dictionary.login.SLIDE1_TITLE}</h2>
                        <p className="text-center text-white">{dictionary.login.SLIDE1_TEXT}</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/4878011/pexels-photo-4878011.jpeg" alt="events-business" className=" rounded-md" />
                    <div className="m-6">
                        <h2 className="text-center text-white text-xl mb-3 font-bold">{dictionary.login.SLIDE2_TITLE}</h2>
                        <p className="text-center text-white">{dictionary.login.SLIDE2_TEXT}</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.pexels.com/photos/6214965/pexels-photo-6214965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="feedback-business" className=" rounded-md" />
                    <div className="m-6">
                        <h2 className="text-center text-white text-xl mb-3 font-bold">{dictionary.login.SLIDE3_TITLE}</h2>
                        <p className="text-center text-white">{dictionary.login.SLIDE3_TEXT}</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default SliderLogin