import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

export default function () {
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div className="calendar">
      <Calendar localizer={localizer} />
    </div>
  );
}
