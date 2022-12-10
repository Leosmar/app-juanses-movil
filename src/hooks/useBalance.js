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
    if (res.isEmpity === true) return setSale(0);
    let totalSum = res.reduce((a, b) => {
      return a + b.totalValue;
    }, 0);
    return setSpent(totalSum);
  };

  const getTotalSale = async () => {
    const res = await getData("get-sale");
    console.log("----------------->");
    console.log(res);
    if (res.isEmpity === true) return setSale(0);
    let totalSum = 0;
    res.map((sale) => {
      totalSum += sale.reduce((a, b) => {
        return a + b.totalValue * b.saleCant;
      }, 0);
    });
    return setSale(totalSum);
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
