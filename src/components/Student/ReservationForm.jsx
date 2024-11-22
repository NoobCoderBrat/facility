import StudentSidebar from "./StudentSidebar.jsx";
import StudentHeader from "./StudentHeader.jsx";
import { FaUser, FaUsers, FaIdBadge, FaPhone, FaCheck } from "react-icons/fa";

const ReservationForm = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 font-mono">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentHeader />
          <main className="flex-1 p-6 overflow-auto">
            <form className="w-full mx-auto p-10 bg-white shadow-xl rounded-lg border">
              <div className="space-y-6">
                {/* Personal Info Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-3 tracking-widest">
                    | PERSONAL INFO
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="input input-bordered flex items-center gap-2">
                      <FaUser className="text-gray-500" />
                      <input
                        type="text"
                        className="grow"
                        placeholder="Full Name"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      <FaIdBadge className="text-gray-500" />
                      <input
                        type="text"
                        className="grow"
                        placeholder="ID Number"
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      <FaPhone className="text-gray-500" />
                      <input
                        type="text"
                        className="grow"
                        placeholder="Contact No."
                      />
                    </label>
                  </div>
                </div>

                {/* Reservation Details Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-3 tracking-widest">
                    | RESERVATION DETAILS
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                      <select className="select select-bordered w-full">
                        <option disabled selected>
                          Select facility type
                        </option>
                        <option value="classroom">Classroom</option>
                        <option value="laboratory">Laboratory</option>
                        <option value="meeting-room">Meeting Room</option>
                        <option value="auditorium">Auditorium</option>
                        <option value="sports-facility">Sports Facility</option>
                      </select>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      <input type="date" className="w-full" />
                    </label>
                    <div className="col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        <label className="input input-bordered flex items-center gap-3">
                          Start:
                          <input type="time" className="w-full" />
                        </label>
                        <label className="input input-bordered flex items-center gap-3">
                          End:
                          <input type="time" className="w-full" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purpose Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-3 tracking-widest">
                    | PURPOSE OF RESERVATION
                  </h2>
                  <textarea
                    placeholder="Write your purpose of visit. . ."
                    className="textarea w-full textarea-bordered mb-1"
                    rows={3}
                  ></textarea>
                  <label className="input input-bordered flex items-center gap-2">
                    <FaUsers className="text-gray-500" />
                    <input
                      type="text"
                      className="grow"
                      placeholder="Attendees *if applicable"
                    />
                  </label>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3 tracking-widest">
                    | SPECIAL REQUIREMENTS
                  </h2>
                  <p className="mb-2">Additional requests (checkbox options)</p>
                  <div className="space-y-2">
                    {[
                      "Projector",
                      "Whiteboard",
                      "Sound System",
                      "Extra Chairs",
                      "Accessibility Support",
                    ].map((label) => (
                      <div key={label} className="flex items-center">
                        <input
                          type="checkbox"
                          id={label.toLowerCase().replace(" ", "-")}
                          className="mr-2"
                        />
                        <label htmlFor={label.toLowerCase().replace(" ", "-")}>
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="other-requirements" className="block mb-1">
                      Other Requirements:{" "}
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        id="other-requirements"
                        className="grow"
                        placeholder="Please specify"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="agree" className="mr-2" />
                  <label htmlFor="agree" className="flex items-center gap-2">
                    <FaCheck className="text-gray-500" />
                    "I agree to follow the facility's guidelines and usage
                    policies."
                  </label>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="w-1/5 btn btn-primary text-white py-2 px-4 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
