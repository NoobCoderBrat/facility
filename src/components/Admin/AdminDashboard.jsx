import AdminNavbar from "./AdminNavbar.jsx";
import { IoIosPeople } from "react-icons/io";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient.jsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
  MdPeople,
} from "react-icons/md";

const localizer = momentLocalizer(moment);

const AdminDashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [approved, setApproved] = useState("");
  const [rejected, setRejected] = useState("");
  const [pending, setPending] = useState("");
  const [total, setTotal] = useState("");

  const fetch_data = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { error, data } = await supabase
        .from("Booking")
        .select("*")
        .eq("status", "Pending")
        .eq("reservationDate", today);
      if (error) throw error;
      setBookingData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const fetch_stat = async () => {
    try {
      const { error, data } = await supabase.from("Booking").select("*");
      if (error) throw error;
      const approved = data.filter((row) => row.status === "Approved").length;
      setApproved(approved);
      const rejected = data.filter((row) => row.status === "Rejected").length;
      setRejected(rejected);
      const pending = data.filter((row) => row.status === "Pending").length;
      setPending(pending);
      const total = data.length;
      setTotal(total);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const approve = async (booking) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
          status: "Approved",
        })
        .eq("id", booking.id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert("Error updating data.");
      console.error("Error during update:", error.message);
    }
  };

  const reject = async (booking) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
          status: "Rejected",
        })
        .eq("id", booking.id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert("Error updating data.");
      console.error("Error during update:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
    fetch_stat();
  }, []);

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
    <div className="bg-gray-100 font-mono min-h-screen">
      <AdminNavbar />
      <main className="p-10 container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {[
            {
              title: "Request Approved",
              count: approved,
              icon: <MdCheckCircle size={40} />,
              bgColor: "bg-green-500",
            },
            {
              title: "Request Declined",
              count: rejected,
              icon: <MdCancel size={40} />,
              bgColor: "bg-red-500",
            },
            {
              title: "Pending Requests",
              count: pending,
              icon: <MdAccessTime size={40} />,
              bgColor: "bg-yellow-500",
            },
            {
              title: "Number of Users",
              count: total,
              icon: <MdPeople size={40} />,
              bgColor: "bg-blue-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-lg shadow-lg p-4 lg:p-6 text-white`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl lg:text-4xl font-bold">{item.count}</h3>
                <span className="text-xl lg:text-2xl">{item.icon}</span>
              </div>
              <p className="text-xs lg:text-sm mt-2">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="w-full bg-white rounded-lg shadow-xl border p-4 lg:p-6 mb-7">
          <div className="flex items-center mb-4">
            <span className="mr-2">
              <IoIosPeople size={32} />
            </span>
            <h2 className="text-lg lg:text-xl font-bold tracking-widest">
              Today's Reservations
            </h2>
          </div>
          <div className="overflow-x-auto bg-white p-5 border rounded">
            <table className="table bg-white">
              <thead className="bg-base-200">
                <tr>
                  <th></th>
                  <th>ID Number</th>
                  <th>Fullname</th>
                  <th>Facility</th>
                  <th>Date</th>
                  <th>No. of Attendees</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((booking, index) => (
                  <tr>
                    <th>1</th>
                    <td>{booking.idNumber}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.facilityType}</td>
                    <td>{booking.reservationDate}</td>
                    <td>{booking.attendees}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-outline btn-success btn-sm"
                        onClick={() => approve(booking)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => reject(booking)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

export default AdminDashboard;
