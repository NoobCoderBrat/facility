import { useState } from "react";
import StudentNavbar from "./StudentNavbar.jsx";
import { FaUser, FaUsers, FaIdBadge, FaPhone, FaCheck } from "react-icons/fa";
import supabase from "../supabaseClient.jsx";

const ReservationForm = () => {
  const name = sessionStorage.getItem("name");
  const [idNumber, setIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [otherRequirements, setOtherRequirements] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [agree, setAgree] = useState(false);

  const handleCheckboxChange = (label) => {
    setSelectedOptions((prev) =>
      prev.includes(label)
        ? prev.filter((option) => option !== label)
        : [...prev, label]
    );
  };

  const add_booking = async () => {
    const { data, error } = await supabase.from("Booking").insert([
      {
        fullName: name,
        idNumber,
        contactNumber,
        facilityType,
        reservationDate,
        startTime,
        endTime,
        attendees,
        otherRequirements,
        selectedOptions,
        status: "Pending",
      },
    ]);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <StudentNavbar />
      <main className="p-8 container mx-auto">
        <div className="w-full mx-auto p-10 bg-white shadow-xl rounded-lg border">
          <div className="space-y-6">
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
                    value={name}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FaIdBadge className="text-gray-500" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FaPhone className="text-gray-500" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Contact No."
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 tracking-widest">
                | RESERVATION DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-2">
                  <select
                    className="select select-bordered w-full"
                    value={facilityType}
                    onChange={(e) => setFacilityType(e.target.value)}
                  >
                    <option disabled selected>
                      Select facility type
                    </option>
                    <option value="Library - Activity Center">
                      Library - Activity Center
                    </option>
                    <option value="Library - Activity Loft">
                      Library - Activity Loft
                    </option>
                    <option value="Library - Discussion Room #1">
                      Library - Discussion Room #1
                    </option>
                    <option value="Library - Discussion Room #2">
                      Library - Discussion Room #2
                    </option>
                    <option value="Library - Discussion Room #3">
                      Library - Discussion Room #3
                    </option>
                    <option value="Library - Discussion Room #4">
                      Library - Discussion Room #4
                    </option>
                    <option value="Library - Discussion Room #5">
                      Library - Discussion Room #5
                    </option>
                    <option value="Library - HERO Learning Commons Auditorium">
                      Library - HERO Learning Commons Auditorium
                    </option>
                    <option value="Library - Archives Room">
                      Library - Archives Room
                    </option>
                    <option value="Kinaadman Hall">Kinaadman Hall</option>
                    <option value="Hinang Auditorium">Hinang Auditorium</option>
                    <option value="Hiraya - Auditorium">
                      Hiraya - Auditorium
                    </option>
                    <option value="Hiraya - CL1">Hiraya - CL1</option>
                    <option value="Hiraya - CL2">Hiraya - CL2</option>
                    <option value="Hiraya - CL3">Hiraya - CL3</option>
                    <option value="Hiraya - CL4">Hiraya - CL4</option>
                    <option value="Hiraya - CL5">Hiraya - CL5</option>
                    <option value="Hiraya - CL6">Hiraya - CL6</option>
                    <option value="Hiraya - CL10">Hiraya - CL10</option>
                    <option value="Hiraya - Navigatu">Hiraya - Navigatu</option>
                    <option value="Hiraya - Multimedia Lab">
                      Hiraya - Multimedia Lab
                    </option>
                    <option value="Hiraya - Net Lab">Hiraya - Net Lab</option>
                    <option value="Hiraya - MSIT Lab">Hiraya - MSIT Lab</option>
                    <option value="Hiraya - Lecture Room #1">
                      Hiraya - Lecture Room #1
                    </option>
                    <option value="Hiraya - Lecture Room #2">
                      Hiraya - Lecture Room #2
                    </option>
                    <option value="Hiraya - Lecture Room #3">
                      Hiraya - Lecture Room #3
                    </option>
                    <option value="Masawa - Lecture Room #1">
                      Masawa - Lecture Room #1
                    </option>
                    <option value="Masawa - Lecture Room #2">
                      Masawa - Lecture Room #2
                    </option>
                    <option value="Masawa - Lecture Room #3">
                      Masawa - Lecture Room #3
                    </option>
                    <option value="Masawa - Lecture Room #4">
                      Masawa - Lecture Room #4
                    </option>
                    <option value="Masawa - Lecture Room #5">
                      Masawa - Lecture Room #5
                    </option>
                    <option value="Masawa - Lecture Room #6">
                      Masawa - Lecture Room #6
                    </option>
                    <option value="Masawa - Lecture Room #7">
                      Masawa - Lecture Room #7
                    </option>
                    <option value="Masawa - Lecture Room #8">
                      Masawa - Lecture Room #8
                    </option>
                  </select>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="date"
                    className="w-full"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                  />
                </label>
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="input input-bordered flex items-center gap-3">
                      Start:
                      <input
                        type="time"
                        className="w-full"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-3">
                      End:
                      <input
                        type="time"
                        className="w-full"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <FaUsers className="text-gray-500" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Number of Attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="file" className="grow" multiple />
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
                      checked={selectedOptions.includes(label)}
                      onChange={() => handleCheckboxChange(label)}
                    />
                    <label htmlFor={label.toLowerCase().replace(" ", "-")}>
                      {label}
                    </label>
                  </div>
                ))}
                <p>Selected Options: {selectedOptions.join(", ")}</p>
              </div>
              <div className="mt-4">
                <label htmlFor="other-requirements" className="block mb-1">
                  Other Requirements:{" "}
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/2">
                  <input
                    type="text"
                    id="other-requirements"
                    className="grow"
                    placeholder="Please specify"
                    value={otherRequirements}
                    onChange={(e) => setOtherRequirements(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                className="mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree" className="flex items-center gap-2">
                <FaCheck className="text-gray-500" />
                "I agree to follow the facility's guidelines and usage
                policies."
              </label>
            </div>
            <div className="flex justify-end mt-10">
              <button
                onClick={add_booking}
                className="w-1/5 btn btn-primary text-white py-2 px-4 rounded-md"
                disabled={agree === false}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationForm;
