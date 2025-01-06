import { useState } from "react";
import StudentNavbar from "./StudentNavbar.jsx";
import { FaUser, FaUsers, FaIdBadge, FaPhone, FaCheck } from "react-icons/fa";
import supabase from "../supabaseClient.jsx";

const ReservationForm = () => {
  const name = sessionStorage.getItem("name");
  const [idNumber, setIdNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [facilityType, setFacilityType] = useState("Library - Activity Center");
  const [reservationDate, setReservationDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [letter, setLetter] = useState(null);
  const [otherRequirements, setOtherRequirements] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (label) => {
    setSelectedOptions((prev) =>
      prev.includes(label)
        ? prev.filter((option) => option !== label)
        : [...prev, label]
    );
  };

  const add_booking = async () => {
    if (!idNumber || !contactNumber || !reservationDate || !startTime || !endTime || !attendees || !letter || !agree) {
      alert("Please fill out all required fields.");
      return;
    }
    const { data, error } = await supabase.from("Booking").insert([
      {
        fullName: name,
        idNumber,
        contactNumber,
        facilityType,
        reservationDate,
        letter,
        startTime,
        endTime,
        attendees,
        otherRequirements,
        selectedOptions,
        status: "Pending",
      },
    ]);
    console.log(data);
    window.location.reload();
  };


  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Letter")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Letter")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setLetter(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
              <p>Attach Letter:</p>
                <input type="file" className="grow" onChange={handleFile}/>
              </label>
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
              {letter === null ? (
              <p className="text-red-500">No file uploaded</p>
            ) : (
              <p className="text-green-500">File uploaded</p>
            )}
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
              I agree to follow the
              <a  onClick={openModal} className="text-blue-500 hover:underline">
                facility's guidelines and usage policies.
              </a>
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
        {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3">Facility's Guidelines and Usage Policies</h2>
            <div className="mb-3">
            <p className="text-l font-bold">Equipment Use</p>
            <p className="text-sm italic">Equipment must be used as intended.</p>
            <p className="text-sm italic">Report any malfunctioning or damaged equipment to staff immediately.</p>
            <p className="text-sm italic">Users are responsible for cleaning and returning equipment to its designated area after use.</p>
            </div>

            <div className="mb-3">
            <p className="text-l font-bold">Cleanliness and Maintenance</p>
            <p className="text-sm italic">Please dispose of trash in the provided bins.</p>
            <p className="text-sm italic">Personal belongings should not be left unattended. The facility is not responsible for lost or stolen items.</p>
            </div>
            
            <div className="mb-3">
            <p className="text-l font-bold">Reservations and Bookings</p>
            <p className="text-sm italic">Reservations for rooms or equipment should be made in advance through the online booking system.</p>
            <p className="text-sm italic">Cancellations should be made at least 24 hours prior to the reserved time.</p>
            </div>

            <div className="mb-3">
            <p className="text-l font-bold">Emergency Procedures</p>
            <p className="text-sm italic">In case of an emergency, follow the evacuation plan and proceed to the nearest exit.</p>
            </div>

            <div className="mb-3">
            <p className="text-l font-bold">Safety and Conduct</p>
            <p className="text-sm italic">Follow all posted safety signs and instructions.</p>
            <p className="text-sm italic">Report any accidents, injuries, or unsafe conditions to staff immediately.</p>
            <p className="text-sm italic">Maintain a respectful and courteous manner towards all users and staff.</p>
            <p className="text-sm italic">Smoking, alcohol, and illegal substances are strictly prohibited on the premises.</p>
            </div>
          
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default ReservationForm;
