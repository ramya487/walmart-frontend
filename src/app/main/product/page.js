"use client";

import React, { useEffect } from "react";
import useProduct from "@/store/store";
import Card from "./Card";

const page = () => {
  const { product, setProduct } = useProduct((state) => state);
  useEffect(() => {
    console.log(product);
  }, []);
  return (
    <div className="bg-[#c3c0c072] pt-3">
      <div className="p-5 text-lg tracking-wide font-semibold text-[#2d2023] bg-white mx-3 rounded-lg">
        Results
      </div>
      <div className="grid grid-cols-4 w-full py-3 px-28 gap-7">
        {product.map((item) => (
          <Card
            img={item.img}
            title={item.title}
            desc={item.description}
            price={item.price}
            brand={item.brand}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
