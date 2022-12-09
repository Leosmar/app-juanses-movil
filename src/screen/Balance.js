import { StyleSheet, View } from "react-native";
import React from "react";
import Layout from "../components/Layout";
import TotalCashRegister from "../components/balance/TotalCashRegister";
import TotalSaleAndSpent from "../components/balance/TotalSaleAndSpent";
import { useBalance } from "../hooks/useBalance";
import BtnBottom from "../components/transaction/BtnBottom";

const Balance = () => {
  const { total, spent, sale } = useBalance();
  return (
    <Layout>
      <View style={[styles.containerBalance]}>
        <View style={styles.containerLeft}>
          <TotalCashRegister total={total} />
        </View>
        <View style={styles.containerRight}>
          <TotalSaleAndSpent value={spent} type="spent" />
          <TotalSaleAndSpent value={sale} type="sale" />
        </View>
      </View>
      <BtnBottom />
    </Layout>
  );
};

export default Balance;

const styles = StyleSheet.create({
  containerBalance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  containerLeft: {
    width: "45%",
  },
  containerRight: {
    width: "40%",
  },
});
