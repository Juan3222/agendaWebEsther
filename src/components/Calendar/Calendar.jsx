import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { es } from "dayjs/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
dayjs.locale("es");

export default function () {
  const localizer = dayjsLocalizer(dayjs);
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
  return (
    <div className="calendar">
      <Calendar localizer={localizer} messages={messages} />
    </div>
  );
}
