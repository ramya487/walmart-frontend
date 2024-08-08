import React from 'react'
import { FiMenu } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";

import { Playfair_Display } from "next/font/google";
const pt = Playfair_Display({ weight:'500', subsets: ['latin'] });

const Navbar = () => {
  return (
    <div className={'py-4 flex justify-between bg-[#402E32] text-white px-14'}>
        <div className='flex gap-6 justify-center items-center'>
            <div><FiMenu size={20}/></div>
            <div className='text-2xl tracking-wider font-extrabold'><span className={pt.className}>E-COMMERCE</span></div>
        </div>
        <div className='flex gap-5 justify-center items-center'>
            <div className='flex flex-col gap-1 text-xs justify-center items-center'><AiOutlineUser size={18}/><div>Profile</div></div>
            <div className='flex flex-col gap-1 text-xs justify-center items-center'><CiHeart size={18}/><div>WishList</div></div>
            <div className='flex flex-col gap-1 text-xs justify-center items-center'><IoBagOutline size={18}/><div>Cart</div></div>
        </div>
    </div>
  )
}

export default Navbar