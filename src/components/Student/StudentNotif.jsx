import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import supabase from "../supabaseClient";

const StudentNotif = ({ show, toggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user_name = sessionStorage.getItem("name");
        if (!user_name) {
          console.log("No user is logged in.");
          return;
        }

        const { data, error } = await supabase
          .from("Booking")
          .select("id, facilityType, status")
          .eq("fullName", user_name)
          .neq("status", "pending")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setNotifications(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (error) {
    alert(error);
  }

  return (
    <div className="relative">
      <button className="p-2 rounded-full" onClick={toggle}>
        <IoNotificationsOutline className="w-6 h-6 text-white" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {notification.facilityType} - {notification.status}
              </a>
              <hr />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotif;
