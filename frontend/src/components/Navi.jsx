import React from "react";
import "../assets/component.css";
import { Link } from "react-router-dom";

function Navi() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-6 px-32">
    <div className="flex items-center flex-shrink-0 text-white mr-6">    
      <Link to="/inference">
        <span className="font-semibold text-3xl tracking-tight">Inference Engine</span>
      </Link>
    </div>
    <div className="block lg:hidden">
      <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <Link to="/data" className="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-200 hover:text-white mr-4">
        Facts
        </Link>
        <Link to="/rules" className="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-200 hover:text-white mr-4">
          Knowledge
        </Link>
      </div>
      <div>
        <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
      </div>
    </div>
  </nav>
  );
}

export default Navi;