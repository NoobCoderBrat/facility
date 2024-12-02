import StudentNavbar from "./StudentNavbar.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const StudentDashboard = () => {
  const events = [
    {
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000), // Add 1 hour
      title: "Study Group",
    },
    {
      start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // Add 2 days
      end: new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
      ), // Add 2 hours
      title: "Project Meeting",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <StudentNavbar />
      <main className="p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 h-full">
          <div className="w-full overflow-x-auto min-h-[500px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "500px", minWidth: "600px" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
