import React from "react";
import "../app/globals.css";
import { IoIosSearch } from "react-icons/io";
import { IoMic } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="hero flex justify-center items-center">
      <div className="flex justify-center items-center w-full">
        <input type="text" className="p-2 rounded-l-lg bg-white bg-opacity-60 border border-black text-white w-1/4 placeholder:text-black placeholder:text-sm placeholder:tracking-wider" placeholder="Search for products..."/>
        <div className="flex justify-center items-center bg-white text-black p-3 rounded-r-lg border border-black"><IoIosSearch size={16}/></div>
        <div className="p-3 m-4 rounded-full bg-white border border-black text-[#1e1d1d]"><IoMic size={21}/></div>
      </div>
    </div>
  );
};

export default Hero;
