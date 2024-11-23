import AdminSidebar from "./AdminSidebar.jsx";
import { IoIosPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient"; // Adjust the path as necessary

const AdminRequest = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");

  // Fetch data from Supabase
  const fetch_data = async () => {
    try {
      const { data, error } = await supabase.from("Booking").select("*");
      if (error) throw error;
      setBookingData(data);
      setFilteredData(data.filter((item) => item.status === "Pending"));
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  // Handle dropdown filter change
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    setFilteredData(
      bookingData.filter((item) => item.status === selectedStatus)
    );
  };

  // Optional: Handle Approve/Reject actions
  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Approved" })
        .eq("id", id);
      if (error) throw error;
      // Refresh data after update
      fetch_data();
    } catch (error) {
      alert("Failed to approve the reservation.");
      console.error("Approve Error:", error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Rejected" })
        .eq("id", id);
      if (error) throw error;
      // Refresh data after update
      fetch_data();
    } catch (error) {
      alert("Failed to reject the reservation.");
      console.error("Reject Error:", error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-mono">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="w-full bg-white rounded-lg shadow-xl border p-4 lg:p-6 mb-7">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg lg:text-xl font-bold tracking-widest flex mt-2">
                  <span className="mr-2">
                    <IoIosPeople size={30} />
                  </span>
                  All Reservations and Bookings
                </h2>
              </div>
              <select
                className="select select-accent w-full max-w-xs"
                value={statusFilter}
                onChange={handleFilterChange}
              >
                <option value="Pending">Pending Reservations</option>
                <option value="Approved">Approved Reservations</option>
                <option value="Rejected">Rejected Reservations</option>
              </select>
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
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id}>
                        <th>{index + 1}</th>
                        <td>{item.idNumber}</td>
                        <td>{item.fullName}</td>
                        <td>{item.facilityType}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.attendees}</td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td className="flex gap-2">
                          {item.status === "Pending" ? (
                            <>
                              <button
                                className="btn text-white btn-success btn-sm"
                                onClick={() => handleApprove(item.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn text-white btn-error btn-sm"
                                onClick={() => handleReject(item.id)}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span>{item.status}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRequest;
