import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

import { Playfair_Display } from "next/font/google";
const pt = Playfair_Display({ weight: "500", subsets: ["latin"] });

const page = () => {
  return (
    <div className={pt.className}>
      <div className="p-5 flex justify-center items-center text-white text-2xl bg-[#402E32] tracking-widest w-full px-9">
        <div><IoArrowBackCircle size={28}/></div>
        <div className="flex-1 justify-center items-center flex"><span>E-COMMERCE Virtual TryOn</span></div>
      </div>
    </div>
  );
};

export default page;
