import { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import { Tooltip } from "flowbite-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { toast } from "react-toastify";
import SDK from "../SDK";
import { useSelector } from "react-redux";

const PostEditing = ({ user = null }) => {
    const { token } = useSelector((state) => state.auth);
    const [field, setField] = useState("Crea il tuo post...");
    const { active: isPlaceholderVisible, setActive: setIsPlaceholderVisible, elRef: contentRef } = useClickOutside(false, { mouseEvent: "mousedown" });

    const handleChange = (event) => {
        console.log(event)
        setField(event.target.value);
    }

    const handleClick = () => {
        setIsPlaceholderVisible(true);
    }

    const handleCreatePost = async () => {
        if (isPlaceholderVisible) return;

        try {
            await SDK.post.create({ content: btoa(field), user }, token);
            toast.success("Post created");
            setField("Crea il tuo post...");
            setIsPlaceholderVisible(true);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (isPlaceholderVisible && (field == "Crea il tuo post...")) setField("");
        else if(!isPlaceholderVisible && field == "") setField("Crea il tuo post...");
    }, [isPlaceholderVisible]);

    return (
        <>
            <div className="m-5 rounded-lg bg-white w-full shadow dark:bg-elements_dark dark:shadow-slate-600">
                <div className="rounded-t-lg">
                    <h3 className="p-4 dark:text-slate-100">Aggiungi un post</h3>
                    <div className="w-full h-[1px] mb-5 bg-slate-100"></div>
                </div>
                <div className="m-4 p-1 h-16" ref={contentRef}>
                    <div>
                        <ContentEditable onChange={handleChange} onClick={handleClick} disabled={false} html={field} className="border-none outline-none dark:text-dark" />
                    </div>
                </div>
                <div className="flex justify-between mt-6 p-4 bg-slate-100 rounded-b-lg dark:bg-bg_dark">
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
                    <motion.button className="btn" onClick={handleCreatePost}
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