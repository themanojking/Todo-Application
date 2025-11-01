import React, { useState } from "react";
import {  FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateField = (name, value) => {
    let message = "";

    if (name === "email") {
      if (!value.trim()) {
        message = "Email is required!";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Invalid email format!";
      }
    }

    if (name === "password") {
      if (!value.trim()) message = "Password is required";
      else if (value.length < 6)
        message = "Password must be at least 6 characters";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  validateField("email",formData.email);
  validateField("password",formData.password);

  if(errors.email || errors.password ) {
    alert("Please fix validation errors first!");
    return;
  }
   
  try {
     const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/signin`,formData);
     if(result.data.message === "success") {
      login(result.data.user);
      alert("Login successfully");
      localStorage.setItem("token", result.data.token);
      navigate("/");
      setFormData({
        email: "",
        password: ""
      });
     } else {
        alert(result.data.message);
     }
  } catch (error) {
    console.log(error);
    alert("Server error. Please try again later");
  }
 
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D2942] p-4">
      {/* Card Container */}
      <div className="bg-[#231F34] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-5xl w-full">
        {/* Left Image Section */}
        <div className="md:w-1/2 relative flex flex-col justify-between">
          <img
            src="assets/signin.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 flex justify-between items-start p-6">
            <h1 className="text-white text-xl font-bold">Task Manager</h1>
          </div>
          <div className="relative z-10 p-6 mt-auto">
            <h2 className="text-white text-xl font-semibold leading-snug">
              Welcome Back 👋 <br /> Glad to See You Again
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl text-white font-semibold mb-2">
            Login to your account
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Don’t have an account?{" "}
            <Link to='/signup'
              href="/Authentication/Signup.jsx"
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#2C2840] border border-[#3C3855] rounded-md 
              focus:outline-none placeholder:text-white text-white focus:ring-2 focus:ring-indigo-500"
            />
             {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[#2C2840] border border-[#3C3855] rounded-md 
                focus:outline-none placeholder:text-white text-white focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-indigo-500" />
                Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-medium transition"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <span className="w-16 h-px bg-gray-700 mr-2"></span>
              Or continue with
              <span className="w-16 h-px bg-gray-700 ml-2"></span>
            </div>

            {/* Google Button */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center text-white gap-2 border border-gray-600 py-2 rounded-md hover:bg-white/10 transition">
                <FcGoogle className="text-xl" /> Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
