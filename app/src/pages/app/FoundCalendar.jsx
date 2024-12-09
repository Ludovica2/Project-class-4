import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { toast } from "react-toastify"
import SDK from "../../SDK"
import { useDispatch, useSelector } from 'react-redux'
import { createNewEvent, setAllEvents } from '../../store/slices/eventSlice';


const localizer = momentLocalizer(moment);


const FoundCalendar = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.all);
    const { token } = useSelector((state) => state.auth);

    const handleSelectSlot = async ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) {
            try {
                const event = await SDK.events.create({title, start, end}, token);
                event.event.start = new Date(event.event.start);
                event.event.end = new Date(event.event.end);
                dispatch(createNewEvent(event.event));
            } catch (error) {
                console.log(error);

                toast.error("Errore interno del server")
            }
        }
    };

    const fetchData = async () => {
        try {
            let data = await SDK.events.getAll(token);
            data = data.map((item) => ({ ...item, start: new Date(item.start), end: new Date(item.end) }))
            dispatch(setAllEvents(data));

        } catch (error) {
            console.log(error);

            toast.error("Errore interno del server")
        }
    }

    const handleForceSync = () => {
        fetchData()
    }

    useEffect(() => {
        document.title = "Calendar - Found!";

        if (events.length == 0) {
            fetchData()
        }
    }, []);

    return (
        <>
            <div style={{ height: '50vh', padding: '20px', width: '150vh' }}>
                <h2>Calendario</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultView="month"
                    selectable
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={handleSelectSlot}
                />
            </div>
        </>
    )
}

export default FoundCalendar