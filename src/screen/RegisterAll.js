import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Layout from "../components/Layout";

import ButtonOnPressItem from "../components/ButtonOnPressItem";

const RegisterAll = () => {
  const Stack = createNativeStackNavigator();

  const RegisterScreen = () => {
    return (
      <Layout>
        <ButtonOnPressItem title="Usuarios del sistema" to="User" />

        <ButtonOnPressItem title="Proveedores" to="Provider" />

        <ButtonOnPressItem title="Clientes" to="Client" />
        
        <ButtonOnPressItem title="Categorias" to="Category" />

        <ButtonOnPressItem title="Pedidos" to="Buy-product" />

        <ButtonOnPressItem title="Marcas de telefonos" to="Brand" />

        <ButtonOnPressItem title="Modelos de telefonos" to="Model" />
      </Layout>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name="Register-screen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegisterAll;

const styles = StyleSheet.create();
