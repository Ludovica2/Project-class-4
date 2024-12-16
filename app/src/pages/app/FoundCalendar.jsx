import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Modal } from 'flowbite-react';
import { motion } from "framer-motion";

import { toast } from "react-toastify";
import SDK from "../../SDK";
import { createNewEvent, deleteEvent, setAllEvents, updateEvent } from '../../store/slices/eventSlice';

const localizer = momentLocalizer(moment);

const FoundCalendar = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.all);
    
    const { token } = useSelector((state) => state.auth);

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        title: '',
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
        setEventDetails({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description || ''
        });
        setSelectedEvent(event);
        setPopupIsOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {...eventDetails};
        
        if(payload.description == "") delete payload.description
        if(payload.title == "") delete payload.title

        if (payload.title) {
            try {
                if (selectedEvent) {
                    await SDK.events.update(selectedEvent._id, payload, token);
                    
                    dispatch(updateEvent({ _id: selectedEvent._id, values: payload }));
                } else {
                    const newEvent = await SDK.events.create(payload, token);
                    dispatch(createNewEvent(newEvent.event));
                }
                setPopupIsOpen(false);
            } catch (error) {
                console.log(error);
                
                toast.error("Errore interno del server");
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
                toast.error("Errore interno del server");
            }
        }
    };

    const fetchData = async () => {
        try {
            let data = await SDK.events.getAll(token);
            data = data.map((item) => ({ ...item }));
            dispatch(setAllEvents(data));
        } catch (error) {
            console.log(error);
            toast.error("Errore interno del server");
        }
    };

    useEffect(() => {
        document.title = "Calendar - Found!";
        if (events.length === 0) {
            fetchData();
        }
    }, []);

    return (
        <>
            <div className="p-5 w-full max-w-6xl mx-auto">
                <h2 className='dark:text-white text-2xl text-center'>Calendario</h2>
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
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>Titolo: </label>
                            <input
                                type="text"
                                value={eventDetails.title}
                                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>Inizio: </label>
                            <input
                                type="datetime-local"
                                value={moment(eventDetails.start).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEventDetails({ ...eventDetails, start: new Date(e.target.value) })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='dark:text-white'>Fine: </label>
                            <input
                                type="datetime-local"
                                value={moment(eventDetails.end).format("YYYY-MM-DDTHH:mm")}
                                onChange={(e) => setEventDetails({ ...eventDetails, end: new Date(e.target.value) })}
                                required
                                className='dark:bg-slate-600 dark:text-white p-2 border border-gray-300 rounded'
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                            <label className='dark:text-white'>Descrizione:</label>
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
