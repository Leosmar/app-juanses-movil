import { useEffect, useState } from "react";
import { getData } from "../api";
import { useIsFocused } from "@react-navigation/native";
export const useBalance = () => {
  const [total, setTotal] = useState(null);
  const [spent, setSpent] = useState(null);
  const [sale, setSale] = useState(null);

  const isFocused = useIsFocused();

  const getTotalCashRegister = async () => {
    const res = await getData("get-cash-register");
    setTotal(res.total);
  };

  const getTotalSpent = async () => {
    const res = await getData("get-spent");
    let totalSum = res.reduce((a, b) => {
      return a + b.totalValue;
    }, 0);
    setSpent(totalSum);
  };

  const getTotalSale = async () => {
    const res = await getData("get-sale");
    let totalSum = 0;
    res.map((sale) => {
      totalSum += sale.reduce((a, b) => {
        return a + b.totalValue * b.saleCant;
      }, 0);
    });
    setSale(totalSum);
  };

  useEffect(() => {
    if (!isFocused) return;
    getTotalCashRegister();
    getTotalSpent();
    getTotalSale();
  }, [isFocused]);

  return {
    total,
    spent,
    sale,
  };
};
