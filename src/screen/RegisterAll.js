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
