import { StyleSheet, View } from "react-native";
import React from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";
import BtnBottom from "../components/transaction/BtnBottom";

const Transaction = ({ navigation }) => {
  return (
    <Layout>
      <Title>Ventas y gastos</Title>

      
      <BtnBottom />
    </Layout>
  );
};

export default Transaction;

const styles = StyleSheet.create();
