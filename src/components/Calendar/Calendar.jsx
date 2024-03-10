import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { db } from "../../firebase/config";

import { getDocs, collection } from "firebase/firestore";

dayjs.locale("es");

export default function YourComponent() {
  const eventosRef = collection(db, "eventos");
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    getDocs(eventosRef)
      .then((querySnapshot) => {
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          let title = data.title;

          if (data.paid) {
            title += " (P)";
          }

          if (data.online) {
            title += " (O)";
          }

          const formattedData = {
            id: doc.id,
            start: dayjs.unix(data.start).toDate(),
            end: dayjs.unix(data.end).toDate(),
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
    <>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          messages={messages}
          events={events}
          views={{
            month: true,
            week: true,
            day: true,
            agenda: true,
          }}
        />{" "}
      </div>
    </>
  );
}
