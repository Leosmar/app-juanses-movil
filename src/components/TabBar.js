import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screen/Home";
import RegistrarCompra from "../screen/RegistrarCompra";
import RegisterAll from "../screen/RegisterAll";
import Inventory from "../screen/Inventory";

const TabBar = () => {
  const Tap = createBottomTabNavigator();

  return (
    <Tap.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: styles.items,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 55, borderTopColor: "transparent" },
      })}
    >
      <Tap.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: "Inicio",
          tabBarIcon: ({ focused, size }) => {
            let iconColor;
            iconColor = focused ? "#96B3FF" : "#fff";
            return <AntDesign name="home" size={30} color={iconColor} />;
          },
        })}
      />

      <Tap.Screen
        name="Deudas"
        component={RegistrarCompra}
        options={({ route }) => ({
          title: "Venta / Pago",
          tabBarIcon: ({ focused, size }) => {
            let iconColor;
            iconColor = focused ? "#96B3FF" : "#fff";
            return (
              <MaterialCommunityIcons
                name="account-cash-outline"
                size={30}
                color={iconColor}
              />
            );
          },
        })}
      />
      <Tap.Screen
        name="Inventory"
        component={Inventory}
        options={({ route }) => ({
          title: "Inventario",
          tabBarIcon: ({ focused, size }) => {
            let iconColor;
            iconColor = focused ? "#96B3FF" : "#fff";
            return <AntDesign name="inbox" size={30} color={iconColor} />;
          },
        })}
      />
      <Tap.Screen
        name="Register"
        component={RegisterAll}
        options={({ route }) => ({
          title: "Registrar",
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, size }) => {
            let iconColor;
            iconColor = focused ? "#96B3FF" : "#fff";

            return (
              <AntDesign name="addusergroup" size={30} color={iconColor} />
            );
          },
        })}
      />
    </Tap.Navigator>
  );
};

const styles = StyleSheet.create({
  items: {
    paddingBottom: 5,
    fontSize: 14,
  },
});

export default TabBar;
