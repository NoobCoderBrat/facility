import { NavLink } from "react-router-dom";
import { useState } from "react";
import StudentNotif from "./StudentNotif.jsx";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaListAlt,
  FaComments,
} from "react-icons/fa";

const StudentNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  return (
    <div className="bg-green-800 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src="csu.png" alt="csu" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Facility Management System</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/student-dashboard"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/student-form"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaCalendarAlt className="mr-2" />
            Booking
          </NavLink>
          <NavLink
            to="/student-reservations"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaListAlt className="mr-2" />
            My Reservations
          </NavLink>
          <NavLink
            to="/student-discussion"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaComments className="mr-2" />
            Discussion Forums
          </NavLink>
        </nav>

        {/* Notifications and Avatar */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <StudentNotif
            show={showNotifications}
            toggle={() => setShowNotifications(!showNotifications)}
          />

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </NavLink>
                <hr />
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Sign Out
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex flex-col px-4 py-2 space-y-2 bg-green-700">
          <NavLink
            to="/student-dashboard"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/student-form"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaCalendarAlt className="mr-2" />
            Booking
          </NavLink>
          <NavLink
            to="/student-reservations"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaListAlt className="mr-2" />
            My Reservations
          </NavLink>
          <NavLink
            to="/student-discussion"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium transition ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            <FaComments className="mr-2" />
            Discussion Forums
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;
