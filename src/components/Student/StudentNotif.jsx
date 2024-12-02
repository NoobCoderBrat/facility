import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const StudentNotif = ({ show, toggle }) => {
  const notifications = [
    { id: 1, message: "Your room booking is confirmed" },
    { id: 2, message: "New discussion in Computer Science forum" },
    { id: 3, message: "Reminder: Project meeting at 3 PM" },
  ];

  return (
    <div className="relative">
      <button className="p-2 rounded-full" onClick={toggle}>
        <IoNotificationsOutline className="w-6 h-6 text-white" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
          {notifications.map((notification) => (
            <>
              <a
                key={notification.id}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {notification.message}
              </a>
              <hr />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotif;
