import { useState } from "react";
import { NavLink } from "react-router-dom";
import supabase from "./supabaseClient";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields before registering.");
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("Student").insert([
        {
          email,
          password,
          name,
        },
      ]);
      if (error) {
        throw new Error("Registration failed. Please try again.");
      }
      alert("Registration successful!");
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.error(err.message || "An error occurred during registration.");
      alert(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="hero min-h-screen font-mono"
        style={{ backgroundImage: "url(csu-1.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-85"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="w-full max-w-md p-7 bg-base-200 rounded-lg text-black">
            <div className="flex justify-center">
              <img
                src="csu.png"
                alt="csu-logo"
                className="w-1/2 md:w-1/3 lg:w-1/4 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-green-900 mb-5">
              CSU Facility Management System
            </h1>
            <div className="mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Student Name"
                  className="grow"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Example@gmail.com"
                  className="grow"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  className="grow"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Show Password
              </label>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-3 font-medium text-white bg-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner text-white bg-transparent"></span>
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="divider before:bg-black after:bg-black">or</div>
            <NavLink to="/login">
              <button className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg">
                Back to Login
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
