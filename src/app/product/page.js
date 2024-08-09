"use client"

import React, { useEffect } from "react";
import useProduct from "@/store/store";

const page = () => {
  const { product, setProduct } = useProduct((state) => state);
  useEffect(() => {
    console.log(product);
  }, []);
  return <div>product page</div>;
};

export default page;
