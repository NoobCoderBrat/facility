import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaListAlt,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentSidebar = () => {
  return (
    <div className="w-64 bg-green-800 text-white p-6">
      <div className="mb-12">
        <img src="csu.png" alt="csu" className="h-26 w-24 mb-4" />
        <h1 className="text-2xl font-bold">Facility Management System</h1>
      </div>
      <nav className="space-y-4">
        <NavLink
          to="/student-dashboard"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/student-form"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaCalendarAlt className="mr-3" />
          Booking
        </NavLink>
        <NavLink
          to="/student-reservations"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaListAlt className="mr-3" />
          My Reservations
        </NavLink>
        <NavLink
          to="/student-discussion"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaComments className="mr-3" />
          Discussion Forums
        </NavLink>
        <br />
        <NavLink
          to="/"
          className="flex items-center text-lg font-medium hover:text-yellow-400 transition"
          activeClassName="text-green-400 font-bold"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </NavLink>
      </nav>
    </div>
  );
};

export default StudentSidebar;
