import { useState } from "react";
// import { FiSearch } from "react-icons/fi";
import StudentNotif from "./StudentNotif.jsx";

const StudentHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-end px-6 py-4 border">
        {/* <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search a room. . . "
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div> */}
        <div className="ms-5 flex items-center space-x-4">
          <StudentNotif
            show={showNotifications}
            toggle={() => setShowNotifications(!showNotifications)}
          />
          <div className="relative">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
