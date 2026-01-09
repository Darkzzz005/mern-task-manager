import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="w-full bg-[#faf7f2] border-b border-[#e6dccf] px-6 py-3 flex items-center justify-between">
      <h1 className="text-[#3b2f2f] text-sm tracking-wide font-medium">
        Personal Tasks Manager
      </h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-sm">
        {user ? (
          <>
            <span className="text-[#7b6a58]">
              welcome,{" "}
              <span className="text-[#3b2f2f] font-medium">{user}</span>
            </span>

            <button
              onClick={handleLogout}
              className="text-[#3b2f2f] hover:underline underline-offset-4"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[#3b2f2f] hover:underline underline-offset-4"
            >
              login
            </Link>

            <Link
              to="/register"
              className="text-[#3b2f2f] hover:underline underline-offset-4"
            >
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
