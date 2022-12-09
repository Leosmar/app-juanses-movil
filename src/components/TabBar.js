import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

import Home from "../screen/Home";
import RegisterAll from "../screen/RegisterAll";
import Inventory from "../screen/Inventory";
import Balance from "../screen/Balance";
import colors from "../helpers/colors";

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
            iconColor = focused ? colors.blueLigthColor : colors.fontColor;
            return <AntDesign name="home" size={30} color={iconColor} />;
          },
        })}
      />
      <Tap.Screen
        name="Balance"
        component={Balance}
        options={({ route }) => ({
          title: "Balance",
          tabBarIcon: ({ focused, size }) => {
            let iconColor;
            iconColor = focused ? colors.blueLigthColor : colors.fontColor;
            return (
              <MaterialCommunityIcons
                name="scale-balance"
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
            iconColor = focused ? colors.blueLigthColor : colors.fontColor;
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
            iconColor = focused ? colors.blueLigthColor : colors.fontColor;

            return <Octicons name="diff-added" size={30} color={iconColor} />;
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
