import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../Context/ContextProvider";

function Navbar({setQuery}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();



  return (
    <nav className="bg-[#231F34] text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ✅ Logo */}
        <div className="text-xl font-bold">
          <Link to="/">NoteApp Manager</Link>
        </div>

        {/* ✅ Search bar (hidden on small screens) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full max-w-md p-2 bg-[#2C2840] border border-[#3C3855] rounded-md 
            focus:outline-none placeholder:text-gray-300 text-white focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* ✅ Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/signin"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-300 font-semibold">{user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ✅ Mobile menu toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-[#2C2840] p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-2 bg-[#231F34] border border-[#3C3855] rounded-md 
            focus:outline-none placeholder:text-gray-300 text-white focus:ring-2 focus:ring-indigo-500"
          />

          {!user ? (
            <>
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-center transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-center transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="block text-gray-300 text-center font-semibold">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
