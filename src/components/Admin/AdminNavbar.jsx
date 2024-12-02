import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="w-full bg-green-800 text-white p-5 flex items-center justify-between">
      <div className="flex items-center">
        <img src="csu.png" alt="csu" className="h-10 w-10 mr-4" />
        <h1 className="text-xl font-bold">Facility Management System</h1>
      </div>
      <nav className="flex space-x-6">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center text-lg font-medium transition ${
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
            }`
          }
        >
          <FaTachometerAlt className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin-request"
          className={({ isActive }) =>
            `flex items-center text-lg font-medium transition ${
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
            }`
          }
        >
          <FaCalendarAlt className="mr-2" />
          Request
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center text-lg font-medium transition ${
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
            }`
          }
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminNavbar;
