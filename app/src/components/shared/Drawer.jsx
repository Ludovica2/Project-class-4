import { useEffect, useState } from "react";
import { useDrawer } from "../../hooks/useDrawer"
import PopUpModal from "./PopUpModal";
import { motion } from "framer-motion"

const titleMAP = {
    review: "Reviews",
}

const reviews = [1, 2, 3, 4, 5];

const Drawer = ({ children, type, showNewBtn = false, newBtnLabel = "Nuova Recensione", onNewClick = () => { } }) => {
    const [isOpen, setIsOpen] = useDrawer(type);
    const [valueReview, setValueReview] = useState(0);

    return (
        <div className={`flex justify-end absolute top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-60 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className={`lg:w-[450px] w-screen h-screen overflow-y-auto absolute right-0 top-0 bg-slate-50 transition-all ${isOpen ? "mr-[0]" : "lg:mr-[-450px] mr-[-100%]"}`}>
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex gap-4 items-center">
                        {
                            showNewBtn && (
                                <PopUpModal title={"Aggiungi Recensione"} sizeModal={"lg"}
                                    showBtn={(openModal) => {
                                        return <button className="btn" onClick={() => openModal(true)}> {/* onClick={() => onNewClick(setIsOpen)} */}
                                            {newBtnLabel}
                                        </button>;
                                    }}
                                >
                                    {
                                        <form /* onSubmit={handleSubmit} */>
                                            {
                                                reviews.map((star, index) => (
                                                    <button className="cursor-default" onClick={() => handleReview(index)}>
                                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300" + (index <= valueReview ? " text-yellow-300" : "")}></i>
                                                    </button>
                                                ))
                                            }
                                            <div className="flex flex-col">
                                                <textarea name="bio" id="bio" /* onInput={handleInput} value={form.personal.bio} */ placeholder="La tua recensione..." className="my-2 p-2 input_field max-lg:min-h-20"></textarea>
                                            </div>
                                            <div className="mt-8">
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
                <div className="p-4 overflow-y-auto flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Drawer