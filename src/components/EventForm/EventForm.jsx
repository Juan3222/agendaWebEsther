import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { db } from "../../firebase/config";
import emailjs from "emailjs-com";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function YourComponent() {
  const eventosRef = collection(db, "eventos");
  const form = useRef();
  const [events, setEvents] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [paid, setPaid] = useState(false);
  const [online, setOnline] = useState(false);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setSelectedEmail(event.target.value);
  };
  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.checked);
  };

  const handleOnlineChange = (e) => {
    setOnline(e.target.checked);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateInSeconds = new Date(selectedDate).getTime() / 1000;
    await addDoc(eventosRef, {
      title: selectedName + " | " + selectedEmail + " | " + selectedNumber,
      start: dateInSeconds,
      end: dateInSeconds,
      paid: paid,
      online: online,
    });
    setSelectedName("");
    setSelectedEmail("");
    setSelectedNumber("");
    setSelectedDate("");
    setPaid(false);
    setOnline(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "eventos"), (snapshot) => {
      const updatedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "eventos", id));
  };

  return (
    <>
      <form
        id="eventForm"
        className="addEventContainer"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="contenedorForm">
          <div className="inputForm">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name={selectedName}
              value={selectedName}
              onChange={handleNameChange}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              name={selectedEmail}
              value={selectedEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="number">Número de teléfono:</label>
            <input
              type="number"
              name="number"
              value={selectedNumber}
              onChange={handleNumberChange}
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
                  Borrar
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}
