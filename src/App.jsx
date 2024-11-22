import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import StudentDashboard from "./components/Student/StudentDashboard";
import ReservationForm from "./components/Student/ReservationForm";
import StudentReservations from "./components/Student/StudentReservations";
import StudentDiscussion from "./components/Student/StudentDiscussion";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminRequest from "./components/Admin/AdminRequest";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-form" element={<ReservationForm />} />
      <Route path="/student-reservations" element={<StudentReservations />} />
      <Route path="/student-discussion" element={<StudentDiscussion />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-request" element={<AdminRequest />} />
    </Routes>
  );
};

export default App;
