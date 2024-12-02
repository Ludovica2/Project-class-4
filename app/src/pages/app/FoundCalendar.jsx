import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);


const FoundCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        document.title = "Calendar - Found!";
    }, []);

    useEffect(() => {
        const savedEvents = [
            {
                id: 0,
                title: 'Mercatini di Natale - Amburgo',
                start: new Date(2024, 11, 8, 0, 0),
                end: new Date(2024, 11, 9, 1, 0),
            },
            {
                id: 1,
                title: 'Capodanno - New York',
                start: new Date(2024, 11, 31, 0, 0), 
                end: new Date(2025, 0, 1, 1, 0), 
            },
        ];

        setEvents(savedEvents);
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
                    onSelectSlot={slotInfo =>
                        alert(
                            `Hai selezionato il ${moment(slotInfo.start).format('MMMM Do YYYY, h:mm a')} al ${moment(slotInfo.end).format('h:mm a')}`
                        )
                    }
                />
            </div>
        </>
    )
}

export default FoundCalendar