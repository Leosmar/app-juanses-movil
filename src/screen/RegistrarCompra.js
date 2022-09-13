import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import  Layout  from '../components/Layout';
import Title from "../components/Title";

const RegistartCompra = ({navigation}) => {
  return (
    <Layout navigation={navigation}>
     <Title>Ventas y pagos</Title>
    </Layout>
  );
};

export default RegistartCompra;

const styles = StyleSheet.create({});
