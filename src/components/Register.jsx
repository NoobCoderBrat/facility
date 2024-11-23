import { useState } from "react";
import supabase from "./supabaseClient";

const Register = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('Student')
      .insert([
        {
       email,
       password,
       name,
        },
      ])
window.location.reload();
  };

  return (
    <div className="w-full max-w-md p-6 bg-base-200 rounded-lg text-black">
      <div className="flex justify-center">
        <img
          src="csu.png"
          alt="csu-logo"
          className="w-1/2 md:w-1/3 lg:w-1/4 object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold text-center text-green-900">
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
              placeholder="example@gmail.com"
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
      <button
        className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
        onClick={onToggle}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Register;
