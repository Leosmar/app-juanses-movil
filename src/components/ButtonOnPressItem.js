import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

import Title from "./Title";
import colors from "../helpers/colors";

const ButtonOnPressItem = ({ title, to }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(to)}
    >

      <Title>{title}</Title>
      <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.fontColor} />
    </TouchableOpacity>
  );
};

export default ButtonOnPressItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: colors.secondColor,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5
  },
});
