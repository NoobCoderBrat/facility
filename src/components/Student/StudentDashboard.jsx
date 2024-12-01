import { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import supabase from "../supabaseClient.jsx";

const localizer = momentLocalizer(moment);

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase
      .from("Booking")
      .select("*")
      .eq("status", "Approved");
      if (error) throw error;

      // Map the data to the format expected by the Calendar
      const formattedEvents = data.map((item) => ({
        title: item.facilityType,
        start: new Date(item.reservationDate + "T" + item.startTime),
        end: new Date(item.reservationDate + "T" + item.endTime),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

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
