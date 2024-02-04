import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import React from "react";

export default function App() {
  const localizer = dayjsLocalizer(dayjs);

  return (
    <div>
      <Calendar
        localizer={localizer}
        style={{
          height: 500,
          width: 500,
        }}
      />
    </div>
  );
}
