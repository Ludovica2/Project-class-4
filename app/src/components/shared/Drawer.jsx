import { useEffect, useState } from "react";
import { useDrawer } from "../../hooks/useDrawer"
import PopUpModal from "./PopUpModal";
import { motion } from "framer-motion"
import StarsInput from "./StarsInput";
import { toast } from "react-toastify";
import SDK from "../../SDK";
import { useDispatch, useSelector } from "react-redux";
import { getFormData } from "../../utilities/formData";
import { setCurrentProfileNewReview } from "../../store/slices/reviewSlice";

const titleMAP = {
    review: "Reviews",
}

const Drawer = ({ children, type, showNewBtn = false, newBtnLabel = "Nuova Recensione", onNewClick = () => { } }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { currentProfileId } = useSelector((state) => state.settings);
    const [isOpen, setIsOpen] = useDrawer(type);
    const [isOpenModalReview, setIsOpenModalReview] = useState(false);
    
    const handleRatingSubmit = async (event) => {
        event.preventDefault();

        const data = getFormData(event);

        data.rating = Number(data.rating);
        
        try {
            const review = await SDK.profile.createReview(currentProfileId, data, token);

            dispatch(setCurrentProfileNewReview(review));
            setIsOpenModalReview(false);
            toast.success("Recensione salvata.")
        } catch(error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className={`flex justify-end absolute top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-60 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className={`lg:w-[450px] w-screen h-screen overflow-hidden absolute right-0 top-0 bg-slate-50 transition-all ${isOpen ? "mr-[0]" : "lg:mr-[-450px] mr-[-100%]"}`}>
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex gap-4 items-center">
                        {
                            showNewBtn && (
                                <PopUpModal isOpen={isOpenModalReview} setIsOpen={setIsOpenModalReview} title={"Aggiungi Recensione"} sizeModal={"lg"}
                                    showBtn={(openModal) => {
                                        return <button className="btn" onClick={() => openModal(true)}> {/* onClick={() => onNewClick(setIsOpen)} */}
                                            {newBtnLabel}
                                        </button>;
                                    }}
                                >
                                    {
                                        <form onSubmit={handleRatingSubmit}>
                                            <StarsInput stars={5} name="rating" label="Valutazione" />
                                            <div className="flex flex-col mt-6">
                                                <label htmlFor="content">Recensione</label>
                                                <textarea name="content" id="content" placeholder="La tua recensione..." className="my-2 p-2 input_field max-lg:min-h-20"></textarea>
                                            </div>
                                            <div className="mt-8 flex justify-center">
                                                <motion.button type="submit" className="btn"
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Salva
                                                </motion.button>
                                            </div>
                                        </form>
                                    }
                                </PopUpModal>
                            )
                        }
                    </div>
                    <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
                        <i className="fa-solid fa-xmark p-4 text-[30px]"></i>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex flex-col gap-4" style={{ height: "calc(100% - 78px)" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Drawer