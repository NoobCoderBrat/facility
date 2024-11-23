import StudentSidebar from "./StudentSidebar.jsx";
import StudentHeader from "./StudentHeader.jsx";
import supabase from "../supabaseClient.jsx";
import { useEffect, useState } from "react";

const StudentReservations = () => {
  const [studentData, setStudentData] = useState([]);
  const name = sessionStorage.getItem("name");

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase
        .from('Booking')
        .select('*')
        .eq('fullName', name)
      if (error) throw error;
      setStudentData(data)
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);


   return (
    <div className="flex h-screen bg-gray-100 font-mono">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 p-6 overflow-auto">
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
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index}>
                <td>{student.idNumber}</td>
                <td>{student.fullName}</td>
                <td>{student.facilityType}</td>
                <td>{student.reservationDate}</td>
                <td>{student.startTime}</td>
                <td>{student.endTime}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentReservations;
