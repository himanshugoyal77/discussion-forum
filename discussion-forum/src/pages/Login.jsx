import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    const user = {
      email: email.value,
      password: password.value,
    };

    const res = await axios.post("http://localhost:8080/login", user);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
      alert("User logged in successfully");
    } else {
      alert("User does not exist");
    }
  };
  return (
    <div className="">
      <div className="bg-purple-500 flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-white">Login</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                    outline-none 
                      bg-white shadow-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border border-purple-200 mt-2 w-full h-10 px-3 rounded 
                    outline-none 
                      bg-white shadow-sm"
              />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center ">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900 pt-1"
                href="/login"
              >
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
