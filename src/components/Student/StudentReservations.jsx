import StudentNavbar from "./StudentNavbar.jsx";
import supabase from "../supabaseClient.jsx";
import { useEffect, useState } from "react";

const StudentReservations = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const name = sessionStorage.getItem("name");

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
        .from("Booking")
        .select("*")
        .eq("fullName", name);

      if (error) throw error;

      setStudentData(data);
      setFilteredData(data); // Initialize filtered data
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredData(studentData);
    } else {
      setFilteredData(studentData.filter((item) => item.status === status));
    }
  };

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
          facilityType: selectedReservation.facilityType,
          reservationDate: selectedReservation.reservationDate,
          startTime: selectedReservation.startTime,
          endTime: selectedReservation.endTime,
          attendees: selectedReservation.attendees,
        })
        .eq("id", selectedReservation.id);

      if (error) throw error;

      fetch_data();
      handleCloseModal();
      alert("Reservation updated successfully!");
    } catch (error) {
      alert("Failed to update the reservation.");
      console.error("Error during update:", error.message);
    }
  };

  const cancel = async (student) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
          status: "User-Cancelled",
        })
        .eq("id", student.id);

      if (error) throw error;

      fetch_data();
      alert("Reservation updated successfully!");
    } catch (error) {
      alert("Failed to update the reservation.");
      console.error("Error during update:", error.message);
    }
  };


  
  const approve = async (student) => {
    try {
      const { error } = await supabase
      .from("Booking")
      .delete()
      .eq("id", student.id);

      if (error) throw error;

      fetch_data();
    } catch (error) {
      alert("Failed to update the reservation.");
      console.error("Error during update:", error.message);
    }
  };
  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <StudentNavbar />
      <main className="p-8 container mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">My Reservations</h1>
          <select
            className="select select-bordered w-48"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
            <option value="Admin-Cancelled">Admin-Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto bg-white p-5 border shadow-lg rounded">
          <table className="table bg-white">
            <thead className="bg-base-200">
              <tr>
                <th>ID Number</th>
                <th>Fullname</th>
                <th>Facility</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Attendees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr key={index}>
                  <td>{student.idNumber}</td>
                  <td>{student.fullName}</td>
                  <td>{student.facilityType}</td>
                  <td>{student.reservationDate}</td>
                  <td>{student.startTime}</td>
                  <td>{student.endTime}</td>
                  <td>{student.status}</td>
                  <td>{student.attendees}</td>
                  <td>
                  {student.status === "Admin-Cancelled" ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 mt-2 mb-2 rounded-md hover:bg-green-600"
                      onClick={() => approve(student)}
                    >
                      Approve
                    </button>
                  ) : (
                    <>
                      <button
                        className={`bg-blue-500 text-white px-4 py-2 mt-2 mb-2 mr-2 rounded-md hover:bg-blue-600 ${
                          student.status === "Cancelled" || student.status === "Admin-Cancelled" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => handleEditClick(student)}
                        disabled={student.status === "Cancelled" || student.status === "Admin-Cancelled"}
                      >
                        Edit
                      </button>
                      <button
                        className={`bg-red-500 text-white px-4 py-2 mt-2 mb-2 rounded-md hover:bg-red-600 ${
                          student.status === "Cancelled" || student.status === "Admin-Cancelled" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => cancel(student)}
                        disabled={student.status === "Cancelled" || student.status === "Admin-Cancelled"}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Reservation</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Facility Type</label>
              <select
                className="select select-bordered w-full"
                value={selectedReservation.facilityType}
                onChange={(e) =>
                  setSelectedReservation((prev) => ({
                    ...prev,
                    facilityType: e.target.value,
                  }))
                }
              >
                <option disabled>Select facility type</option>
                <option value="Library - Activity Center">
                  Library - Activity Center
                </option>
                <option value="Library - Activity Loft">
                  Library - Activity Loft
                </option>
                <option value="Library - Discussion Room #1">
                  Library - Discussion Room #1
                </option>
                <option value="Library - Discussion Room #2">
                  Library - Discussion Room #2
                </option>
                <option value="Library - Discussion Room #3">
                  Library - Discussion Room #3
                </option>
                <option value="Library - Discussion Room #4">
                  Library - Discussion Room #4
                </option>
                <option value="Library - Discussion Room #5">
                  Library - Discussion Room #5
                </option>
                <option value="Library - HERO Learning Commons Auditorium">
                  Library - HERO Learning Commons Auditorium
                </option>
                <option value="Library - Archives Room">Library - Archives Room</option>
                <option value="Kinaadman Hall">Kinaadman Hall</option>
                <option value="Hinang Auditorium">Hinang Auditorium</option>
                <option value="Hiraya - Auditorium">Hiraya - Auditorium</option>
                <option value="Hiraya - CL1">Hiraya - CL1</option>
                <option value="Hiraya - CL2">Hiraya - CL2</option>
                <option value="Hiraya - CL3">Hiraya - CL3</option>
                <option value="Hiraya - CL4">Hiraya - CL4</option>
                <option value="Hiraya - CL5">Hiraya - CL5</option>
                <option value="Hiraya - CL6">Hiraya - CL6</option>
                <option value="Hiraya - CL10">Hiraya - CL10</option>
                <option value="Hiraya - Navigatu">Hiraya - Navigatu</option>
                <option value="Hiraya - Multimedia Lab">Hiraya - Multimedia Lab</option>
                <option value="Hiraya - Net Lab">Hiraya - Net Lab</option>
                <option value="Hiraya - MSIT Lab">Hiraya - MSIT Lab</option>
                <option value="Hiraya - Lecture Room #1">Hiraya - Lecture Room #1</option>
                <option value="Hiraya - Lecture Room #2">Hiraya - Lecture Room #2</option>
                <option value="Hiraya - Lecture Room #3">Hiraya - Lecture Room #3</option>
                <option value="Masawa - Lecture Room #1">Masawa - Lecture Room #1</option>
                <option value="Masawa - Lecture Room #2">Masawa - Lecture Room #2</option>
                <option value="Masawa - Lecture Room #3">Masawa - Lecture Room #3</option>
                <option value="Masawa - Lecture Room #4">Masawa - Lecture Room #4</option>
                <option value="Masawa - Lecture Room #5">Masawa - Lecture Room #5</option>
                <option value="Masawa - Lecture Room #6">Masawa - Lecture Room #6</option>
                <option value="Masawa - Lecture Room #7">Masawa - Lecture Room #7</option>
                <option value="Masawa - Lecture Room #8">Masawa - Lecture Room #8</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                className="border rounded w-full p-2"
                value={selectedReservation.reservationDate}
                onChange={(e) =>
                  setSelectedReservation((prev) => ({
                    ...prev,
                    reservationDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="border rounded w-full p-2"
                value={selectedReservation.startTime}
                onChange={(e) =>
                  setSelectedReservation((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                className="border rounded w-full p-2"
                value={selectedReservation.endTime}
                onChange={(e) =>
                  setSelectedReservation((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Number of Attendees</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={selectedReservation.attendees}
                onChange={(e) =>
                  setSelectedReservation((prev) => ({
                    ...prev,
                    attendees: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReservations;
