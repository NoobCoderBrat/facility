import StudentSidebar from "./StudentSidebar.jsx";
import StudentHeader from "./StudentHeader.jsx";

const StudentReservations = () => {
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
                  <th></th>
                  <th>ID Number</th>
                  <th>Fullname</th>
                  <th>Facility</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>202-01328</td>
                  <td>Danny Cahilig</td>
                  <td>Hiraya Auditorium</td>
                  <td>11/30/2024</td>
                  <td>8:00 AM</td>
                  <td>2:00 PM</td>
                  <td>
                    <button className="btn btn-outline btn-warning btn-sm">
                      Pending
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentReservations;
