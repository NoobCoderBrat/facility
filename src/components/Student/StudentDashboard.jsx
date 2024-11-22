import StudentSidebar from "./StudentSidebar.jsx";
import StudentHeader from "./StudentHeader.jsx";
import StudentCalendar from "./StudentCalendar.jsx";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-mono">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 p-6 overflow-auto">
          <StudentCalendar />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
