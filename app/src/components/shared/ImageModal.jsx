import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../image-slide.css';
import { Navigation, Pagination } from 'swiper/modules';

const ImageModal = ({ children, images }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        console.log(isOpen);
    }, []);

    return (
        <>
            {
                children(setIsOpen)
            }
            {
                isOpen && (
                    <div className="modal">
                        <button className="close-modal" onClick={() => setIsOpen(false)}>
                            <i className="fa-solid fa-xmark text-secondaryColor hover:text-secondaryColor_Hover"></i>
                        </button>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={images.length > 0 ? {
                                clickable: true,
                            } : false}
                            navigation={images.length > 0}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                images && (
                                    images.map((img, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <img className="modal-content" src={img} />
                                            </SwiperSlide>
                                        )
                                    })
                                )
                            }
                        </Swiper>
                    </div>
                )
            }
        </>
    )
}

export default ImageModal