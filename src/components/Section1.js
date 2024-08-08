import React from 'react'
import { Playfair_Display } from "next/font/google";
const pt = Playfair_Display({ weight:'500', subsets: ['latin'] });

const Section1 = () => {
  return (
    <div className='flex justify-between py-5 px-14'>
        <div className={pt.className}>
            <div className='tracking-wider font-extrabold'>E-COMMERCE BUYERS</div>
        </div>
        <div className='flex gap-7 text-sm tracking-wider font-medium'>
            <div>Fashion</div>
            <div>Electronics</div>
            <div>Home</div>
            <div>Beauty</div>
            <div>Grocery</div>
            <div>Fitness</div>
            <div>Health</div>
        </div>
    </div>
  )
}

export default Section1