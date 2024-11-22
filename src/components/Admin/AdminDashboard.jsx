import AdminSidebar from "./AdminSidebar.jsx";
import { IoIosPeople } from "react-icons/io";

const AdminDashboard = () => {
  const expectedVisitors = 120;
  const time_in = 85;
  const time_out = 60;
  const future_visitors = 30;

  return (
    <div className="flex h-screen bg-gray-100 font-mono">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {[
              {
                title: "Request Approved",
                count: expectedVisitors,
                icon: "👥",
                bgColor: "bg-gray-400",
              },
              {
                title: "Request Declined",
                count: time_in,
                icon: "➡️",
                bgColor: "bg-gray-400",
              },
              {
                title: "Pending Requests",
                count: time_out,
                icon: "⬅️",
                bgColor: "bg-gray-400",
              },
              {
                title: "Number of Users",
                count: future_visitors,
                icon: "⏳",
                bgColor: "bg-gray-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-lg shadow-lg p-4 lg:p-6 text-white`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {item.count}
                  </h3>
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
                      <button className="btn btn-outline btn-success btn-sm">
                        Approve
                      </button>
                      <button className="btn btn-outline btn-error btn-sm">
                        Reject
                      </button>
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

export default AdminDashboard;
