"use client";

import React, { useEffect } from "react";
import useProduct from "@/store/store";
import Card from "./Card";

const product = [
  {
    "title": "Aviator Sunglasses",
    "description": "Timeless style with UV protection",
    "price": 59.99,
    "brand": "SunGuard",
    "img": ""
  },
  {
    "title": "Sports Sunglasses",
    "description": "Ideal for outdoor activities",
    "price": 49.99,
    "brand": "ActiveVision",
    "img": ""
  },
  {
    "title": "Round Sunglasses",
    "description": "Vintage-inspired with modern lenses",
    "price": 39.99,
    "brand": "VintageCharm",
    "img": ""
  },
  {
    "title": "Wayfarer Sunglasses",
    "description": "Classic design with polarized lenses",
    "price": 45.99,
    "brand": "UrbanStyle",
    "img": ""
  },
  {
    "title": "Fashion Sunglasses",
    "description": "Chic and stylish for any occasion",
    "price": 54.99,
    "brand": "GlamourEyes",
    "img": ""
  },
  {
    "title": "Wrap Sunglasses",
    "description": "Secure fit for active lifestyles",
    "price": 42.99,
    "brand": "SportFlex",
    "img": ""
  },
  {
    "title": "Luxury Sunglasses",
    "description": "Premium materials and design",
    "price": 99.99,
    "brand": "Elegance",
    "img": ""
  },
  {
    "title": "Retro Sunglasses",
    "description": "Old-school look with new technology",
    "price": 34.99,
    "brand": "Nostalgia",
    "img": ""
  },
  {
    "title": "Polarized Sunglasses",
    "description": "Reduces glare for better vision",
    "price": 64.99,
    "brand": "ClearView",
    "img": ""
  },
  {
    "title": "Vintage Sunglasses",
    "description": "Classic design with modern comfort",
    "price": 52.99,
    "brand": "RetroCharm",
    "img": ""
  }
]


const page = () => {
  // const { product, setProduct } = useProduct((state) => state);
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
