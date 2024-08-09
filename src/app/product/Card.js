import Image from "next/image";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const Card = ({ img, title, desc, price, brand }) => {
  return (
    <div className="p-5 flex flex-col gap-7 bg-white rounded-md">
      <div>
        <Image src={img} height={200} width={200} />
      </div>
      <div className="flex flex-col gap-1" >
        <div className="flex justify-between items-center">
          <div className="font-semibold text-base">{title}</div>
          <div className="text-sm">Rs.{price}</div>
        </div>
        <div className="text-xs">{desc}</div>
      </div>
      <div className="flex justify-between items-center text-[14px] font-semibold">
        {brand}
        <button className="px-4 py-2 rounded-lg text-xs bg-orange-400 text-white hover:bg-red-400">
          Try On
        </button>
        <div><FaCartShopping size={18} fill="#837373"/></div>
      </div>
    </div>
  );
};

export default Card;