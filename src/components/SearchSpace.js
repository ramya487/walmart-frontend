"use client";

import React, { useState } from "react";

const SearchSpace = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setOpen(!open);
    setSearch(!search);
    setCounter(counter + 1);
    if (counter != 0){
        console.log("api call hit");
    }
  };

  return (
    <div className="bg-red-100 bg-opacity-55 h-56 mx-60 rounded-lg grid grid-cols-2">
      {counter != 2 ? (
        <>
          <div className="flex justify-center items-center text-lg tracking-wide">
            {search ? <>Listening...</> : <>Tap on mic to speak...</>}
          </div>
          <div className="flex justify-center items-center">
            <img
              src={open ? "/mic2.gif" : "/mic2static.png"}
              alt="mic"
              className="w-40 h-auto rounded-full"
              onClick={handleClick}
            />
          </div>
        </>
      ) : (
        <>good day</>
      )}
    </div>
  );
};

export default SearchSpace;
