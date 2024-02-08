import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { db } from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";

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

  const localizer = dayjsLocalizer(dayjs);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "eventos", "sCE388WNBBBqf4DUIOus"); // Creo constante que iguala la db (database), coleccion "eventos" y la id de uno de los documentos (desp hay que cambiarlo por useParams)
    getDoc(docRef)
      .then((resp) => {
        const data = resp.data(); // Despues de resolver la promesa creo data = a la data de firebase
        const formattedData = { // Le pedi a chat gpt que me cambie el formato por que traia la fecha en segundos
          start: dayjs.unix(data.start.seconds).toDate(),
          end: dayjs.unix(data.end.seconds).toDate(),
          title: data.title,
        };
        setEvents([formattedData]); // Guardardo los eventos en el estado
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);

  return (
    <div className="calendar">
      <Calendar localizer={localizer} messages={messages} events={events} />
    </div>
  );
}
