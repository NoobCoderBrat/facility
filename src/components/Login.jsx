import { useState } from "react";

const Login = ({ onToggle, openModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      openModal(); // Simulate login error modal
    }, 2000);
  };

  return (
    <div className="w-full max-w-md p-10 bg-base-200 rounded-lg text-black">
      <div className="flex justify-center">
        <img
          src="csu.png"
          alt="csu-logo"
          className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold text-center text-green-900">
        CSU Facility Management System
      </h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-2">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="example@gmail.com"
              required
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              className="grow"
              required
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

        <div className="flex justify-between gap-2">
          <select className="select select-bordered w-1/2">
            <option>Student</option>
            <option>Admin</option>
          </select>

          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-white bg-transparent"></span>
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <div className="divider before:bg-black after:bg-black">or</div>
      <button
        className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
        onClick={onToggle}
      >
        Create an Account
      </button>
    </div>
  );
};

export default Login;
