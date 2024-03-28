import React, { useState, useEffect } from "react";
import "../assets/component.css";
import { Link, useNavigate } from "react-router-dom";

function Navi() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ token ใน localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    // ลบ token และอัปเดตสถานะการ login
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // กลับไปยังหน้า login หรือหน้าหลัก
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#4682b4] py-6 px-6 lg:px-32">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/inference">
          <span className="font-semibold text-3xl tracking-tight text-teal-200 hover:text-white mr-4">
            Medical Expert System
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          {/* Icon and other elements here */}
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/data" className="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-200 hover:text-white mr-4">
            Facts Editor
          </Link>
          <Link to="/rules" className="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-200 hover:text-white mr-4">
            Rules Editor
          </Link>
          <Link to="/categorys" className="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-200 hover:text-white mr-4">
            Category Editor
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navi;
