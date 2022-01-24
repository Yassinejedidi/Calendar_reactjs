import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';
import '../Components/button.css'
export default function () {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents,] = useState([])
    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });

    };
    async function handleEventAdd(data) {
        await axios.post("https://yassine-backend.herokuapp.com/api/calendar/create-event", data.event);

        console.log("999", data);
        console.table(events)

    }
    const logout = async () => {
        localStorage.clear();
        window.location.href = '/';



        window.location.href = '/';
    }
    async function handleDatesSet(data) {
        const response = await axios.get("https://yassine-backend.herokuapp.com/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString())
        setEvents(response.data);
        console.log("malek", response);

    }
    return (
        <section>
            <button className='button' onClick={() => setModalOpen(true)}>ADD CLIENT</button>
            <button onClick={() => logout()} className='style' >Logout</button>

            <div style={{ position: "relative", zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={(event) => handleEventAdd(event)}
                    datesSet={(date) => handleDatesSet(date)}
                />
            </div>
            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />

        </section>

    )
}


