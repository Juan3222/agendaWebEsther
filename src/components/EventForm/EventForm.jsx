import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { db } from "../../firebase/config";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function YourComponent() {
  const eventosRef = collection(db, "eventos");

  const [events, setEvents] = useState([]);

  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [paid, setPaid] = useState(false);
  const [online, setOnline] = useState(false);

  const [eventEditVisible, setEventEditVisible] = useState(null);
  const [eventId, setSelectedEventId] = useState("");
  const [selectedNewName, setSelectedNewName] = useState("");
  const [selectedNewEmail, setSelectedNewEmail] = useState("");
  const [selectedNewNumber, setSelectedNewNumber] = useState("");
  const [selectedNewDate, setSelectedNewDate] = useState("");
  const [selectedPaidCheck, setSelectedPaidCheck] = useState(false);
  const [selectedOnlineCheck, setSelectedOnlineCheck] = useState(false);

  useEffect(() => {
    getDocs(eventosRef)
      .then((querySnapshot) => {
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          let title = data.title;

          if (data.paid == true) {
            title += " (P)";
          }

          if (data.online == true) {
            title += " (O)";
          }

          const formattedData = {
            id: doc.id,
            start: dayjs.unix(data.start).toDate(),
            end: dayjs.unix(data.end).toDate(),
            title: title + " | " + data.email + " | " + data.number,
          };
          eventData.push(formattedData);
        });
        setEvents(eventData);
        console.log(eventData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateInSeconds = new Date(selectedDate).getTime() / 1000;
    await addDoc(eventosRef, {
      title: selectedName,
      email: selectedEmail,
      number: selectedNumber,
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

  const handleActualizarInformacion = async (id, e) => {
    e.preventDefault();
    const docRef = doc(db, "eventos", id);

    await updateDoc(docRef, {
      title: selectedNewName,
      email: selectedNewEmail,
      number: selectedNewNumber,
      date: selectedNewDate,
      paid: selectedPaidCheck,
      online: selectedOnlineCheck,
    });
  };

  const toggleEventEdit = (eventId) => {
    setEventEditVisible(eventEditVisible === eventId ? null : eventId);
  };

  return (
    <>
      <form
        id="eventForm"
        className="addEventContainer"
        onSubmit={handleSubmit}
      >
        <div className="contenedorForm">
          <div className="inputForm">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setSelectedEmail(e.target.value)}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="number">Número de teléfono:</label>
            <input
              type="number"
              name="number"
              onChange={(e) => setSelectedNumber(e.target.value)}
            />
          </div>
          <div className="inputForm">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="datetime-local"
              onChange={(e) => setSelectedDate(e.target.value)}
              name="fecha"
            />
          </div>
          <div className="inputForm check">
            <label htmlFor="paid">Consulta paga:</label>
            <input
              type="checkbox"
              name="paid"
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}
            />
          </div>
          <div className="inputForm check">
            <label htmlFor="online">Consulta online:</label>
            <input
              type="checkbox"
              name="online"
              checked={online}
              onChange={(e) => setOnline(e.target.checked)}
            />
          </div>
          <button className="boton" type="submit">
            Agregar
          </button>
        </div>
      </form>
      <form className="contenedorLista">
        {events.map((data) => {
          return (
            <div className="lista" key={data.id}>
              <p>{data.title + " | " + data.email + " | " + data.number}</p>

              <button type="button" onClick={() => toggleEventEdit(data.id)}>
                Editar
              </button>
              {eventEditVisible === data.id && (
                <div className="eventUpdate" style={{ display: "block" }}>
                  <div>
                    <input
                      style={{ display: "none" }}
                      type="text"
                      defaultValue={data.id}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      readOnly
                    />
                    <input
                      type="text"
                      value={selectedNewName || data.title}
                      onChange={(e) => setSelectedNewName(e.target.value)}
                      placeholder="Nuevo nombre"
                    />

                    <input
                      type="email"
                      value={selectedNewEmail || data.email}
                      onChange={(e) => setSelectedNewEmail(e.target.value)}
                      placeholder="Nuevo email"
                    />
                    <input
                      type="number"
                      value={selectedNewNumber || data.number}
                      onChange={(e) => setSelectedNewNumber(e.target.value)}
                      placeholder="Nuevo numero"
                    />
                    <input
                      type="datetime-local"
                      value={selectedNewDate || data.date}
                      onChange={(e) => setSelectedNewDate(e.target.value)}
                    />
                    <div>
                      <label htmlFor="paidCheck">Pago</label>
                      <input
                        name="paidCheck"
                        type="checkbox"
                        value={selectedPaidCheck}
                        checked={selectedPaidCheck}
                        onChange={(e) => setSelectedPaidCheck(e.target.checked)}
                      />
                    </div>
                    <div>
                      <label htmlFor="onlineCheck">Online</label>
                      <input
                        name="onlineCheck"
                        type="checkbox"
                        value={selectedOnlineCheck}
                        checked={selectedOnlineCheck}
                        onChange={(e) =>
                          setSelectedOnlineCheck(e.target.checked)
                        }
                      />
                    </div>

                    <button
                      onClick={(e) => handleActualizarInformacion(data.id, e)}
                    >
                      Actualizar información
                    </button>
                  </div>
                </div>
              )}
              <button type="button" onClick={() => handleDelete(data.id)}>
                Borrar
              </button>
            </div>
          );
        })}
      </form>
    </>
  );
}
