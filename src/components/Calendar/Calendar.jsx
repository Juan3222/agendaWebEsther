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
        const formattedData = {
          // Le pedi a chat gpt que me cambie el formato por que traia la fecha en segundos
          start: dayjs.unix(data.start.seconds).toDate(),
          end: dayjs.unix(data.end.seconds).toDate(),
          title: data.title,
          paid: data.paid,
          online: data.online,
        };
        setEvents([formattedData]); // Guardardo los eventos en el estado
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);
  const components = {
    event: (props) => {
      const { paid, online } = props.event;
      // Condicionales simples, revisa el valor bool de las propiedades paid y online, para agregar el ícono de consulta pagada, y/o el de consulta online (esto sería la idea en general, si ves como hacerlo más prolijo, mejor)
      if (paid == true && online == true) {
        {
          return <div>{props.title + "💲" + " 🎧 "}</div>;
        }
      } else if (paid == true) {
        return <div>{props.title + "💲"}</div>;
      } else if (online == true) {
        return <div>{props.title + " 🎧 "}</div>;
      }
    },
  };

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        messages={messages}
        events={events}
        formats={{
          dayHeaderFormat: (date) => {
            return dayjs(date).format("dddd - DD/MM/YYYY");
          },
        }}
        components={components}
      />
    </div>
  );
}
