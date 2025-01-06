import AdminNavbar from "./AdminNavbar.jsx";
import { IoIosPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const AdminRequest = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const name = sessionStorage.getItem("name");

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase.from("Booking").select("*").ilike('facilityType', `%${name}%`);
      if (error) throw error
      setBookingData(data);
      setFilteredData(data.filter((item) => item.status === "Pending"));
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    setFilteredData(
      bookingData.filter((item) => item.status === selectedStatus)
    );
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Approved" })
        .eq("id", id);
      if (error) throw error;
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
      fetch_data();
    } catch (error) {
      alert("Failed to reject the reservation.");
      console.error("Reject Error:", error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Admin-Cancelled" })
        .eq("id", id);
      if (error) throw error;
      fetch_data();
    } catch (error) {
      alert("Failed to cancel the reservation.");
      console.error("Cancel Error:", error.message);
    }
  };

  const handleRApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Cancel-Approved" })
        .eq("id", id);
      if (error) throw error;
      fetch_data();
    } catch (error) {
      alert("Failed to approve the cancel request.");
      console.error("RApprove Error:", error.message);
    }
  };

  const handleRDecline = async (id) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({ status: "Cancel-Decline" })
        .eq("id", id);
      if (error) throw error;
      fetch_data();
    } catch (error) {
      alert("Failed to decline the cancel request.");
      console.error("RDecline Error:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="bg-gray-100 font-mono min-h-screen">
      <AdminNavbar />
      <main className="p-10 container mx-auto">
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
              <option value="User-Cancelled">Cancel Requests</option>
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
                  <th>Letter</th>
                  <th>Actions</th>
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
                      <td>{new Date(item.reservationDate).toLocaleDateString()}</td>
                      <td>{item.attendees}</td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>
                        <a href={item.letter} download target="_blank">
                          <button className="btn text-white bg-blue-500 btn-sm">
                            Download
                          </button>
                        </a>
                      </td>
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
                        ) : item.status === "Approved" ? (
                          <>
                            <button
                              className="btn text-white btn-warning btn-sm"
                              onClick={() => handleCancel(item.id)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : item.status === "User-Cancelled" ? (
                          <>
                            <button
                              className="btn text-white btn-primary btn-sm"
                              onClick={() => handleRApprove(item.id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn text-white btn-secondary btn-sm"
                              onClick={() => handleRDecline(item.id)}
                            >
                              Decline
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
  );
};

export default AdminRequest;
