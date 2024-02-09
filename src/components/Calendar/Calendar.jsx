import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { db } from "../../firebase/config";
import { getDocs, collection } from "firebase/firestore";

dayjs.locale("es");

export default function YourComponent() {
  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Sin eventos",
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value);
  };

  const localizer = dayjsLocalizer(dayjs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventosRef = collection(db, "eventos");
    getDocs(eventosRef)
      .then((querySnapshot) => {
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          let title = data.title;

        // Condición para añadir "(P)" al título si data.paid es true
        if (data.paid) {
          title += " (P)";
        }

        // Condición para añadir "(O)" al título si data.online es true
        if (data.online) {
          title += " (O)";
        }

          const formattedData = {
            id: doc.id,
            start: dayjs.unix(data.start.seconds).toDate(),
            end: dayjs.unix(data.end.seconds).toDate(),
            title: title,
          };
          eventData.push(formattedData);
        });
        setEvents(eventData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

  return (
    <div className="calendar">
      <Calendar localizer={localizer} messages={messages} events={events} />

      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleDateChange} 
      />
    </div>
  );
}
