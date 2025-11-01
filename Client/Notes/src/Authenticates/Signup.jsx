import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
       username: "",
       email: "",
       password: "",
       terms: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //handle change input
  const handleChange = (e) => {
    const {name,value,type,checked} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if(!formData.username.trim()) {
        newErrors.username = "Username is required!";
    }
    if(!formData.email.trim()) {
        newErrors.email = "Email is required!";
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format!"; 
    }
    if(!formData.password.trim()) {
        newErrors.password = "Password is required!";
    } else if(formData.password.length < 6) {
        newErrors.password = "Password must be atleast 6 characters!";
    }
    if(!formData.terms) {
        newErrors.terms = "You must be agree to the Terms & Conditions!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()) {
      axios.post("http://localhost:5000/signup", formData)
      .then(() => {
        // console.log(result);
        navigate("/signin");
        alert("Form submitted successfully");
        setFormData({
           username: "",
           email: "",
           password: "",
           terms: false,
        });
      }).catch((err) => console.log(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D2942] p-4">
      {/* Card Container */}
      <div className="bg-[#231F34] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-5xl w-full">
        
        {/* Left Image Section */}
        <div className="md:w-1/2 relative flex flex-col justify-between">
          <img
            src="assets/signup.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 flex justify-between items-start p-6">
            <h1 className="text-white text-xl font-bold">Task Manager</h1>
          </div>
          <div className="relative z-10 p-6 mt-auto">
            <h2 className="text-white text-xl font-semibold leading-snug">
              Capturing Moments, <br /> Creating Planing
            </h2>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl text-white font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?{" "}
            <Link to='/signin' className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input 
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-[#2C2840] border border-[#3C3855] rounded-md focus:outline-none placeholder:text-white text-white focus:ring-2 focus:ring-indigo-500"
            />
            {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#2C2840] border border-[#3C3855] rounded-md focus:outline-none placeholder:text-white text-white focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[#2C2840] border border-[#3C3855] rounded-md focus:outline-none placeholder:text-white text-white focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="accent-indigo-500"
                
              />
              <label htmlFor="terms" className="text-white">
                I agree to the{" "}
                <a href="#" className="text-indigo-400 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
                <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-medium transition"
            >
              Create account
            </button>

            <div className="flex items-center justify-center text-gray-400 text-sm">
              <span className="w-16 h-px bg-gray-700 mr-2"></span>
              Or register with
              <span className="w-16 h-px bg-gray-700 ml-2"></span>
            </div>

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

export default SignupPage;
