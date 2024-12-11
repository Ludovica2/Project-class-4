import { Modal } from "flowbite-react"
import { motion } from "framer-motion"
import { useState } from "react";

const PopUpModal = ({ children, title, showBtn, sizeModal }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (event) => {
        event.preventDefault();
        setModalIsOpen((modalIsOpen) => !modalIsOpen);
    }

    return (
        <>
            {
                showBtn(setModalIsOpen) 
            }
            {
                modalIsOpen && (
                    <Modal dismissible size={sizeModal} show={modalIsOpen/* show */} onClose={openModal/* onClose */}>
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