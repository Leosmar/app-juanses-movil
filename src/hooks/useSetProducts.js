import { useState } from "react";

export const useSetProducts = () => {
  const [isVisible, setIsVisible] = useState("none");
  const [products, setProducts] = useState([]);
  return { isVisible, setIsVisible, products, setProducts };
};
