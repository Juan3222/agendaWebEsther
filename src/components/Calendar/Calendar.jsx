import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { db } from "../../firebase/config";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

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
  const colRef = collection(db, "eventos");

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id,
            /* start: dayjs.unix(data.start.seconds).toDate(),
            end: dayjs.unix(data.end.seconds).toDate(), */
          });
          console.log(data);
        }); //Hasta aquí, es toda la función para traer la coleccion entera, usé el metodo getDocs, en consola podes ver que trae ambos documentos de firestore, pero a la hora de formatear la fecha, da error, lo dejé comentado para que lo veas. También dejé sin comentar formattedData, ahora mismo no hace nada, pero para que veas si podes hacer algo
        const formattedData = {
          start: dayjs.unix(data.start.seconds).toDate(),
          end: dayjs.unix(data.end.seconds).toDate(),
          title: data.title,
          paid: data.paid,
          online: data.online,
        };
        setEvents([formattedData]);

        console.log(formattedData);
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
