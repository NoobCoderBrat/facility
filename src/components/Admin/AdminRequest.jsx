import AdminSidebar from "./AdminSidebar.jsx";
import { IoIosPeople } from "react-icons/io";
import { useState } from "react";

const AdminRequest = () => {
  const [isApprove, isRejected] = useState(true);

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
              <select className="select select-accent w-full max-w-xs">
                <option>Approved Reservations</option>
                <option>Rejected Reservations</option>
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
                  <tr>
                    <th>1</th>
                    <td>202-01328</td>
                    <td>Danny Cahilig</td>
                    <td>Hiraya Auditorium</td>
                    <td>11/30/2024</td>
                    <td>10</td>
                    <td>8:00 AM</td>
                    <td>2:00 PM</td>
                    <td className="flex gap-2">
                      {isApprove ? (
                        <button className="btn text-white btn-success btn-sm">
                          Approve
                        </button>
                      ) : (
                        <button className="btn text-white btn-error btn-sm">
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
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
