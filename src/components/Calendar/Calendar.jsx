import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

export default function () {
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
