import { useState } from "react";

export const useSetProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  return { isVisible, setIsVisible, products, setProducts };
};
