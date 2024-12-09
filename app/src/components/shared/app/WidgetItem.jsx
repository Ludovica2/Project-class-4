import { Link } from "react-router-dom"
import PopUpModal from "../PopUpModal";
import CustomBox from "../CustomBox";

const WidgetItem = ({ to = "", img, alt, text, wgt }) => {

    return (
        <>
            {
                wgt == "events" && (
                    <div className='flex gap-3 items-center'>
                        <div>
                            <Link to={to}>
                                <img src={img} alt={alt} className='rounded-full max-w-[45px]' />
                            </Link>
                        </div>
                        <div className='flex gap-3'>
                            <Link to={to}>
                                <p className='text-sm dark:text-dark'>{text}</p>
                            </Link>
                            <button>
                                <i className="fa-solid fa-suitcase-rolling text-primayColor "></i>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                wgt == "city" && (
                    <div className='flex justify-between border-b-slate-100'>
                        <div>
                            <i className="fa-solid fa-map-pin mr-4 text-primayColor"></i>
                            <span className='text-sm dark:text-dark'>{text}</span>
                        </div>
                        <div className='mr-4'>
                            <button className="relative btn-tooltip">
                                <Link to={to}>
                                    <i className="fa-solid fa-share text-text_secondaryColor"></i>
                                </Link>
                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                    Vai al Post
                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                wgt == "review" && (
                    <div className='flex justify-between border-b-slate-100'>
                        {
                            <PopUpModal title={"Recensione"} sizeModal={"2xl"}
                                showBtn={(openModal) => {
                                    return <div onClick={() => openModal(true)} className="flex gap-2 cursor-pointer">
                                        <img src={img} alt={alt} className='rounded-full max-w-[45px]' />
                                        <span className='text-sm text-left max-w-48 self-center truncate dark:text-dark'>{text}</span>
                                    </div>;
                                }}
                            >
                                {
                                    <>
                                        <CustomBox profile="Ludovica Spinelli" imgProfile="https://images.pexels.com/photos/12421204/pexels-photo-12421204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" nickname="_luvi_" dataPost="5 minuti fa">
                                            <p className="dark:text-dark">Bellissimo locale a tema piratesco, cibo molto buono e ottimo intrattenimento.</p>
                                        </CustomBox>
                                    </>
                                }
                            </PopUpModal>
                        }
                    </div>
                )
            }
        </>
    )
}

export default WidgetItem
