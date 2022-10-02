import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Layout from "../components/Layout";
import ButtonOnPressItem from "../components/ButtonOnPressItem";

const InventoryScreen = () => {
  return (
    <Layout>
      <ButtonOnPressItem title="Telefonos" to="Phone" />
      <ButtonOnPressItem title="Accesorios y otros" to="Other-product" />
      
    </Layout>
  );
};

const Inventory = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Inventory-screen" component={InventoryScreen} />
    </Stack.Navigator>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  tabBarNone: {
    display: "none",
  },
});
