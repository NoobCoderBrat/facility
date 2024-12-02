import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen font-mono"
        style={{
          backgroundImage: "url(csu-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-85"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              <span className="text-yellow-600">Book</span>,
              <span className="text-green-600">Study</span>, Succeed Your Space,
              Your Time!
            </h1>
            <p className="py-4 sm:py-6 text-white text-sm sm:text-base md:text-lg">
              Welcome to the Campus Facility Management System, your one-stop
              platform for accessing and managing study spaces, classrooms, and
              shared campus facilities with ease. Our system empowers you to
              reserve the spaces you need, check real-time availability, and
              stay organized, all in one convenient location. With a simple
              booking process and instant updates, we help you focus on what
              matters most—your learning journey.
            </p>
            <NavLink to="/login">
              <button className="btn btn-primary text-white font-bold w-full sm:w-1/2 md:w-1/4">
                Get Started
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
