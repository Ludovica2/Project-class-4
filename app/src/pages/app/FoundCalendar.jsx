import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { FileInput, Label, Modal } from 'flowbite-react';
import { motion } from "framer-motion";

import { toast } from "react-toastify";
import SDK from "../../SDK";
import { createNewEvent, deleteEvent, setAllEvents, updateEvent } from '../../store/slices/eventSlice';
import { useDictionary } from '../../provider/Language';

const localizer = momentLocalizer(moment);

const FoundCalendar = () => {
    const dispatch = useDispatch();
    const [dictionary] = useDictionary()
    const events = useSelector((state) => state.event.all);

    const { token } = useSelector((state) => state.auth);
    const [isOpenDragDdrop, setIsOpenDragDdrop] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        cover_image: { name: "", src: "" },
        title: "",
        start: new Date(),
        end: new Date(),
        description: ''
    });

    const handleSelectSlot = ({ start, end }) => {
        setEventDetails({ title: '', start, end, description: '' });
        setSelectedEvent(null);
        setPopupIsOpen(true);
    };

    const handleEventClick = (event) => {
        if (event.cover_img) {
            console.log(event.cover_img)
            setImagePreview({
                id: `image-preview-${new Date().getTime()}`,
                name: event.cover_img.split("/").at(-1),
                src: `${event.cover_img}?token=${token}`
            })
        } else {
            setImagePreview(null);
        }
        setEventDetails({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description || '',
        });
        setSelectedEvent(event);
        setPopupIsOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { ...eventDetails };

        if (imagePreview) payload.cover_image = { ...imagePreview };

        if (payload.description == "") delete payload.description
        if (payload.title == "") delete payload.title

        if (payload.title) {
            if (typeof payload.start === "object") payload.start = payload.start.toString();
            if (typeof payload.end === "object") payload.end = payload.end.toString();
            
            try {
                if (selectedEvent) {
                    await SDK.events.update(selectedEvent._id, payload, token);

                    dispatch(updateEvent({ _id: selectedEvent._id, values: payload }));
                } else {
                    const newEvent = await SDK.events.create(payload, token);
                    dispatch(createNewEvent(newEvent.event));
                }
                setPopupIsOpen(false);
                setImagePreview(null);
                fetchData();
            } catch (error) {
                console.log(error);

                toast.error(`${dictionary.errors.SERVER}`);
            }
        }
    };

    const handleDelete = async () => {
        if (selectedEvent) {
            try {
                await SDK.events.delete(selectedEvent._id, token);
                dispatch(deleteEvent(selectedEvent._id));
                setPopupIsOpen(false);
            } catch (error) {
                toast.error(`${dictionary.errors.SERVER}`);
            }
        }
    };

    const handleDragDrop = () => {
        setIsOpenDragDdrop((isOpenDragDdrop) => !isOpenDragDdrop);
    }

    const handleChangeImages = (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImagePreview({
                    id: `image-preview-${i}-${new Date().getTime()}`,
                    name: `image-${i}-${new Date().getTime()}.${reader.result.split(",")[0].split("/")[1].split(";")[0]}`,
                    src: reader.result
                });
            }, false);
            reader.readAsDataURL(event.target.files[i]);
        }
    }

    const handleDeleteImages = (id) => {
        setImagePreview(null);
    }


    const fetchData = async () => {
        try {
            let data = await SDK.events.getAll(token);
            data = data.map((item) => ({ ...item }));
            dispatch(setAllEvents(data));
        } catch (error) {
            console.log(error);
            toast.error(`${dictionary.errors.SERVER}`);
        }
    };

    useEffect(() => {
        document.title = "Calendar - Found!";
        fetchData();
    }, []);

    return (
        <>
            <div className="p-5 w-full max-w-6xl mx-auto">
                <h2 className='dark:text-white text-2xl text-center'>{dictionary.globals.createNewEvent}</h2>
                <div className="overflow-auto">
                    <Calendar
                        localizer={localizer}
                        events={events.map(p => ({
                            ...p,
                            start: new Date(p.start),
                            end: new Date(p.end),
                        }))}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '80vh' }}
                        defaultView="month"
                        selectable
                        onSelectEvent={handleEventClick}
                        onSelectSlot={handleSelectSlot}
                    />
                </div>
            </div>

            <Modal show={popupIsOpen} size="md" onClose={() => setPopupIsOpen(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        {
                            imagePreview && (
                                <div className="flex flex-wrap gap-[2%] my-2 pt-2">
                                    <div key={imagePreview.id} className="relative w-[31.33%]">
                                        <span
                                            onClick={() => handleDeleteImages(imagePreview.id)}
                                            className="absolute cursor-pointer right-[-12.5px] top-[-12.5px] h-[25px] w-[25px] bg-slate-100 text-slate-500 rounded-full flex justify-center items-center border-2 border-slate-300">
                                            x
                                        </span>
                                        <img src={imagePreview.src} className="w-full" />
                                    </div>
                                </div>
                            )
                        }
                        {
                            isOpenDragDdrop && !imagePreview && (
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
                        {
                            !imagePreview && (
                                <motion.button type="button" className="p-2 mr-2 relative btn-tooltip" onClick={handleDragDrop}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fa-solid fa-camera text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                                    {
                                        isOpenDragDdrop && " Close"
                                    }
                                </motion.button>
                            )
                        }
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>{dictionary.calendar.TITLE}: </label>
                            <input
                                type="text"
                                value={eventDetails.title}
                                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>{dictionary.calendar.START}: </label>
                            <input
                                type="datetime-local"
                                value={moment(eventDetails.start).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEventDetails({ ...eventDetails, start: new Date(e.target.value) })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>{dictionary.calendar.END}: </label>
                            <input
                                type="datetime-local"
                                value={moment(eventDetails.end).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEventDetails({ ...eventDetails, end: new Date(e.target.value) })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                            <label className='dark:text-white'>{dictionary.calendar.DESCRIPTION}:</label>
                            <textarea className='w-full max-w-md dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                                value={eventDetails.description}
                                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                            />
                        </div>
                        <div className='flex justify-between gap-2 mt-1'>
                            <button className="btn" type="submit">
                                <i className="fa-solid fa-check dark:text-white"></i>
                            </button>
                            {selectedEvent && (
                                <motion.button
                                    className="btn"
                                    type="button"
                                    onClick={handleDelete}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fa-solid fa-trash-can dark:text-white"></i>
                                </motion.button>
                            )}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FoundCalendar;
