import { Modal } from "flowbite-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const PopUpModal = ({ children, title, showBtn, sizeModal, isOpen, setIsOpen, onCloseModal = () => {} }) => {
    const [modalIsOpen, setModalIsOpen] = isOpen !== undefined && typeof setIsOpen === "function" ? [isOpen, setIsOpen] : useState(false);
    
    useEffect(() => {
        if (!modalIsOpen) {
            onCloseModal();
        }
    }, [modalIsOpen]);

    return (
        <>
            {
                showBtn(setModalIsOpen) 
            }
            {
                modalIsOpen && (
                    <Modal dismissible size={sizeModal} show={modalIsOpen/* show */} onClose={() => setModalIsOpen(false)}>
                        <Modal.Header className="dark:text-slate-100">{title}</Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-col justify-between">
                                {children}
                            </div>
                        </Modal.Body>
                        {/* <Modal.Footer>
                    <motion.button type="submit" className="btn"
                        whileTap={{ scale: 0.95 }}
                    >
                        Salva
                    </motion.button>
                </Modal.Footer> */}
                    </Modal>
                )
            }
        </>
    )
}

export default PopUpModal;