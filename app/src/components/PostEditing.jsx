import { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import { FileInput, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "../hooks/useClickOutside";
import { toast } from "react-toastify";
import SDK from "../SDK";
import EmojiPicker from "emoji-picker-react";

const postType = {
    basicType: "basic",
    reviewType: "review",
    eventType: "event"
}

const PostEditing = ({ onNewPost }) => {
    const { user, token } = useSelector((state) => state.auth);
    const [field, setField] = useState("");
    const [isOpenDragDdrop, setIsOpenDragDdrop] = useState(false);
    const [showLocality, setShowLocality] = useState(false);
    const [valueReview, setValueReview] = useState(0);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [post, setPost] = useState({
        userId: user._id,
        date: "",
        typePost: "",
        content: "",
        video: [],
        images: [],
        locality: "",
        val_review: null
    });

    const reviews = [1, 2, 3, 4, 5];

    const handleReview = (value) => {
        setValueReview(value);
        setPost((post) => ({ ...post, val_review: value }));
    };

    const handleChange = (event) => {
        console.log(event)
        setField(event.target.value);

        setPost((post) => ({ ...post, content: event.target.value }));
    }

    const handleDragDrop = () => {
        setIsOpenDragDdrop((isOpenDragDdrop) => !isOpenDragDdrop);
    }

    const handleTypePost = (event) => {
        setPost((post) => ({ ...post, typePost: event.target.value }));
    }

    const handleLocalityPost = (event) => {
        setPost((post) => ({ ...post, locality: event.target.value }));
    }

    const handleShowLocality = () => {
        setShowLocality((showLocality) => !showLocality);
    }

    const handleChangeImages = (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImagesPreview((f) => ([
                    ...f,
                    {
                        id: `image-preview-${i}-${new Date().getTime()}`,
                        name: `image-${i}-${new Date().getTime()}.${reader.result.split(":")[1].split("/")[1].replace(";base64,", "")}`,
                        src: reader.result
                    }
                ]));
            }, false);
            reader.readAsDataURL(event.target.files[i]);
        }
    }

    const handleDeleteImages = (id) => {
        setImagesPreview((i) => ([...i.filter((_) => _.id != id)]));
    }

    const handleEmoji = () => {
        setShowEmoji((show) => !show);
    }

    const onEmojiClick = (event) => {
        setField((prevInput) => prevInput + event.emoji);
        setShowEmoji(false);
    };

    const handleCreatePost = async () => {
        try {
            await SDK.post.create({ content: btoa(field), images: post.images}, token);
            setImagesPreview([]);
            toast.success("Post created");
            setField("");
            onNewPost();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        setPost((p) => ({ ...p, images: imagesPreview }));
    }, [imagesPreview])

    return (
        <>
            <div className="m-5 max-w-[1000px] rounded-lg bg-white w-full shadow dark:bg-elements_dark dark:shadow-slate-600 max-lg:mx-4 max-md:max-w-[600px] max-lg:max-w-[700px]">
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
                        post.typePost == postType.reviewType && (
                            <div className="flex mb-3">
                                <span className="mr-2 text-dark">Valutazione</span>
                                <div>
                                    {
                                        reviews.map((star, index) => (
                                            <button className="cursor-default" onClick={() => handleReview(index)}>
                                                <i className={"fa-solid fa-star text-text_secondaryColor hover:text-yellow-300" + (index <= valueReview ? " text-yellow-300" : "")}></i>
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        showLocality && (
                            <div className="flex mb-3 items-center">
                                <label className="mr-4 text-dark">Dove sei stato?</label>
                                <input type="text" className="input_field" onChange={handleLocalityPost} />
                            </div>
                        )
                    }
                    {
                        post.typePost == postType.eventType && (
                            <div className="mb-2">
                                <div className='flex flex-col'>
                                    <label className='text-dark'>Titolo: </label>
                                    <input
                                        type="text"
                                        /* value={eventDetails.title}
                                        onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })} */
                                        required
                                        className='input_field p-2 border border-gray-300 rounded'
                                    />
                                </div>
                                <div className="flex gap-5 my-5">
                                    <div className='flex flex-col w-1/2'>
                                        <label className='text-dark'>Inizio: </label>
                                        <input
                                            type="datetime-local"
                                            /* value={moment(eventDetails.start).format("YYYY-MM-DDTHH:mm")}
                                            onChange={(e) => setEventDetails({ ...eventDetails, start: new Date(e.target.value) })} */
                                            required
                                            className='input_field p-2 border border-gray-300 rounded'
                                        />
                                    </div>
                                    <div className='flex flex-col w-1/2'>
                                        <label className='text-dark'>Fine: </label>
                                        <input
                                            type="datetime-local"
                                            /* value={moment(eventDetails.end).format("YYYY-MM-DDTHH:mm")}
                                            onChange={(e) => setEventDetails({ ...eventDetails, end: new Date(e.target.value) })} */
                                            required
                                            className='input_field p-2 border border-gray-300 rounded'
                                        />
                                    </div>
                                </div>
                                <span className='text-dark'>Descrizione:</span>
                            </div>
                        )
                    }
                    <div>
                        { /* <ContentEditable onChange={handleChange} onClick={handleClick} disabled={false} html={field} className="border-none outline-none mb-3 dark:text-dark" /> */}
                        <textarea className="w-full border-none outline-none focus:ring-0 focus:outline-none active:outline-none dark:bg-elements_dark" onChange={handleChange} value={field} placeholder="Crea il tuo post..."></textarea>
                    </div>
                    <div>
                        <button onClick={handleEmoji}>
                            <i className="fa-regular fa-face-grin-wide text-primayColor"></i>
                        </button>
                        {
                            showEmoji && (
                                <EmojiPicker onEmojiClick={onEmojiClick} previewConfig={{showPreview:false}} />
                            )
                        }
                    </div>
                    {
                        imagesPreview.length > 0 && (
                            <div className="flex flex-wrap gap-[2%] my-2">
                                {
                                    imagesPreview.map(({ id, src }) => (
                                        <div key={id} className="relative w-[31.33%]">
                                            <span
                                                onClick={() => handleDeleteImages(id)}
                                                className="absolute cursor-pointer right-[-12.5px] top-[-12.5px] h-[25px] w-[25px] bg-slate-100 text-slate-500 rounded-full flex justify-center items-center border-2 border-slate-300">
                                                x
                                            </span>
                                            <img src={src} className="w-full" />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    {
                        isOpenDragDdrop && (
                            <div className="flex w-full items-center flex-col justify-center">
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
                                    <FileInput id="dropzone-file" multiple={true} name="images" onChange={handleChangeImages} className="hidden" />
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
                        <motion.button onClick={handleShowLocality} className="p-2 mr-2 relative btn-tooltip"
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