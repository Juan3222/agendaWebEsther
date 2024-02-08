import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { es } from "dayjs/locale/es";
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
  return (
    <div className="calendar">
      <Calendar localizer={localizer} messages={messages} events={events} />
    </div>
  );
}
