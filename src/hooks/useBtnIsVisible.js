import { useState } from "react";

export const useBtnIsVisible = () => {
  const [isVisible, setIsVisible] = useState("none");
  return { isVisible, setIsVisible };
};

