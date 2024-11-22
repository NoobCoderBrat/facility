import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const StudentCalendar = () => {
  const events = [
    {
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Study Group",
    },
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").add(2, "hours").toDate(),
      title: "Project Meeting",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-xl flex flex-col h-full p-5">
      <div className="flex-1">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default StudentCalendar;
