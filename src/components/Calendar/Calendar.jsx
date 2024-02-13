import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { db } from "../../firebase/config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

  const eventosRef = collection(db, "eventos");

  const localizer = dayjsLocalizer(dayjs);

  const [events, setEvents] = useState([]);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedName, setSelectedName] = useState("");
  const [paid, setPaid] = useState(false);
  const [online, setOnline] = useState(false);

  const handlePaidChange = (e) => {
    setPaid(e.target.checked);
  };

  const handleOnlineChange = (e) => {
    setOnline(e.target.checked);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateInSeconds = new Date(selectedDate).getTime() / 1000;
    addDoc(eventosRef, {
      title: selectedName,
      start: dateInSeconds,
      end: dateInSeconds,
      paid: paid,
      online: online,
    });
  };

  // Función para borrar documentos de la colección
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "eventos", id));
  };

  useEffect(() => {
    getDocs(eventosRef)
      .then((querySnapshot) => {
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
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
            start: dayjs.unix(data.start).toDate(),
            end: dayjs.unix(data.end).toDate(),
            title: title,
          };
          eventData.push(formattedData);
          console.log(formattedData);
        });
        setEvents(eventData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

  const components = {
    event: (props) => {
      const { paid, online } = props.event;
      // Condicionales simples, revisa el valor bool de las propiedades paid y online, para agregar el ícono de consulta pagada, y/o el de consulta online (esto sería la idea en general, si ves como hacerlo más prolijo, mejor ((esto funciona, si traes solo un documento lo podes comprobar)))
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
    <>
      <div className="calendar">
        <Calendar localizer={localizer} messages={messages} events={events} />
      </div>

      <form className=" addEventContainer" onSubmit={handleSubmit}>
        <div className="contenedorForm">
          <div className="inputForm">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={selectedName}
              onChange={handleNameChange}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={handleDateChange}
              name="fecha"
            />
          </div>
          <div className="inputForm check">
            <label htmlFor="paid">Consulta paga:</label>
            <input
              type="checkbox"
              name="paid"
              checked={paid}
              onChange={handlePaidChange}
            />
          </div>
          <div className="inputForm check">
            <label htmlFor="online">Consulta online:</label>
            <input
              type="checkbox"
              name="online"
              checked={online}
              onChange={handleOnlineChange}
            />
          </div>
          <button className="boton" type="submit">
            Agregar
          </button>
        </div>
        <div className="contenedorLista">
          {events.map((data) => {
            return (
              <div className="lista" key={data.id}>
                <p>{data.title}</p>
                <button type="button" onClick={() => handleDelete(data.id)}>
                  borrar
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}
