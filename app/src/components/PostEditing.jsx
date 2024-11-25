import { useState } from "react"
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import { Tooltip } from "flowbite-react";

const PostEditing = () => {
    const [field, setField] = useState("Crea il tuo post...");

    const handleChange = (event) => {
        setField(event.target.value);
    }

    return (
        <>
            <div className="m-5 rounded-lg bg-white w-full shadow">
                <div className="rounded-t-lg">
                    <h3 className="p-4">Aggiungi un post</h3>
                    <div className="w-full h-[1px] mb-5 bg-slate-100"></div>
                </div>
                <div className="m-4 p-1 h-16">
                    <ContentEditable onChange={handleChange} disabled={false} html={field} className="border-none outline-none" />
                </div>
                <div className="flex justify-between mt-6 p-4 bg-slate-100 rounded-b-lg">
                    <div className="flex relative">
                        <motion.button className="p-2 mr-2 relative btn-tooltip"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-camera text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top">
                                Aggiungi Foto
                                <div className="arrow-tooltip arrow-tlt-top"></div>
                            </div>
                        </motion.button>
                        <motion.button className="p-2 mr-2 relative btn-tooltip"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-video text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top">
                                Aggiungi Video
                                <div className="arrow-tooltip arrow-tlt-top"></div>
                            </div>
                        </motion.button>
                        <motion.button className="p-2 mr-2 relative btn-tooltip"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-location-dot text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top">
                                Aggiungi Luogo
                                <div className="arrow-tooltip arrow-tlt-top"></div>
                            </div>
                        </motion.button>
                    </div>
                    <motion.button className="btn"
                        whileTap={{ scale: 0.95 }}
                    >
                        Invia
                    </motion.button>
                </div>
            </div>
        </>
    )
}

export default PostEditing