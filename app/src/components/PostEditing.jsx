import { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import { FileInput, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "../hooks/useClickOutside";
import { toast } from "react-toastify";
import SDK from "../SDK";

const postType = {
    basicType: "basic",
    reviewType: "review",
    eventType: "event"
}

const PostEditing = ({ onNewPost }) => {
    const { user, token } = useSelector((state) => state.auth);
    const [field, setField] = useState("");
    const [isOpenDragDdrop, setIsOpenDragDdrop] = useState(false);
    const [review1, setReview1] = useState(false);
    const [review2, setReview2] = useState(false);
    const [review3, setReview3] = useState(false);
    const [review4, setReview4] = useState(false);
    const [review5, setReview5] = useState(false);
    const [post, setPost] = useState({
        userId: user._id,
        date: "",
        type: "",
        content: "",
        photo: [],
        video: [],
        luogo: "",
        val_review: null
    });

    const handleReview1 = () => {
        setReview1(true);
    };

    const handleReview2 = () => {
        setReview1(true);
        setReview2(true);
    };

    const handleReview3 = () => {
        setReview1(true);
        setReview2(true);
        setReview3(true);
    };

    const handleReview4 = () => {
        setReview1(true);
        setReview2(true);
        setReview3(true);
        setReview4(true);
    };

    const handleReview5 = () => {
        setReview1(true);
        setReview2(true);
        setReview3(true);
        setReview4(true);
        setReview5(true);
    };

    const handleChange = (event) => {
        console.log(event)
        setField(event.target.value);

        setPost((post) => ({ ...post, content: event.target.value }));
    }

    const handleDragDrop = () => {
        setIsOpenDragDdrop(true);
    }

    const handleTypePost = (event) => {
        setPost((post) => ({ ...post, type: event.target.value }));
    }

    const handleValueReview = (value) => {
        setPost((post) => ({ ...post, val_review: value }));
    }

    const handleCreatePost = async () => {
        try {
            await SDK.post.create({ content: btoa(field) }, token);
            toast.success("Post created");
            setField("Crea il tuo post...");
            onNewPost();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="m-5 max-w-[1000px] rounded-lg bg-white w-full shadow dark:bg-elements_dark dark:shadow-slate-600">
                <div className="flex justify-between items-center rounded-t-lg">
                    <h3 className="p-4 dark:text-slate-100">Aggiungi un post</h3>
                    <div className="flex m-3">
                        <label htmlFor="typePost" className="mr-1 self-center dark:text-dark"> Tipologia </label>
                        <div>
                            <select id="typePost" onChange={handleTypePost} className="input_field">
                                <option value={postType.basicType} className=" dark:text-slate-300">Base</option>
                                <option value={postType.reviewType} className=" dark:text-slate-300">Recensione</option>
                                <option value={postType.eventType} className=" dark:text-slate-300">Evento</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] mb-5 bg-slate-100"></div>
                <div className="m-4 p-1 min-h-16">
                    {
                        post.type == postType.reviewType && (
                            <div className="flex mb-3">
                                <span className="mr-2">Valutazione</span>
                                <div className="">
                                    <button className="cursor-default" id="v1" onClick={handleReview1}>
                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300" + (review1 ? " text-yellow-300" : "")}></i>
                                    </button>
                                    <button className="cursor-default" id="v2" onClick={handleReview2}>
                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300" + (review2 ? " text-yellow-300" : "")}></i>
                                    </button>
                                    <button className="cursor-default" id="v3" onClick={handleReview3}>
                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300" + (review3 ? " text-yellow-300" : "")}></i>
                                    </button>
                                    <button className="cursor-default" id="v4" onClick={handleReview4}>
                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300"  + (review4 ? " text-yellow-300" : "")}></i>
                                    </button>
                                    <button className="cursor-default" id="v5" onClick={handleReview5}>
                                        <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300"  + (review5 ? " text-yellow-300" : "")}></i>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    <div>
                        { /* <ContentEditable onChange={handleChange} onClick={handleClick} disabled={false} html={field} className="border-none outline-none mb-3 dark:text-dark" /> */ }
                        <textarea className="w-full border-none outline-none focus:ring-0 focus:outline-none active:outline-none" onChange={handleChange} value={field} placeholder="Crea il tuo post..."></textarea>
                    </div>
                    {
                        isOpenDragDdrop && (
                            <div className="flex w-full items-center justify-center">
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <FileInput id="dropzone-file" className="hidden" />
                                </Label>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-between mt-6 p-4 bg-slate-100 rounded-b-lg dark:bg-bg_dark">
                    <div className="flex relative">
                        <motion.button className="p-2 mr-2 relative btn-tooltip" onClick={handleDragDrop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-camera text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top dark:bg-elements_dark dark:text-slate-400">
                                Aggiungi Foto
                                <div className="arrow-tooltip arrow-tlt-top dark:bg-elements_dark dark:text-elements_dark"></div>
                            </div>
                        </motion.button>
                        <motion.button className="p-2 mr-2 relative btn-tooltip" onClick={handleDragDrop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-video text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top dark:bg-elements_dark dark:text-slate-400">
                                Aggiungi Video
                                <div className="arrow-tooltip arrow-tlt-top dark:bg-elements_dark dark:text-elements_dark"></div>
                            </div>
                        </motion.button>
                        <motion.button className="p-2 mr-2 relative btn-tooltip"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-solid fa-location-dot text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            <div className="tooltip-container tooltip-top dark:bg-elements_dark dark:text-slate-400">
                                Aggiungi Luogo
                                <div className="arrow-tooltip arrow-tlt-top dark:bg-elements_dark dark:text-elements_dark"></div>
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