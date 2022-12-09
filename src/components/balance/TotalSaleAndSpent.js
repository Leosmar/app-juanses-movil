import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../helpers/colors";

const TotalSaleAndSpent = ({ value, type }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            type === "sale" ? colors.successColor : colors.errorColor,
        },
      ]}
    >
      <Text style={[styles.text, styles.titleText]}>
        {type === "sale" ? "Ventas" : "Gastos"} totales
      </Text>
      <Text style={[styles.text, styles.numberText]}>
        {value ? `${value}$` : <ActivityIndicator />}
      </Text>
    </View>
  );
};

export default TotalSaleAndSpent;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "40%",
    marginVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: colors.fontColor,
  },
  titleText: {
    fontSize: 18,
  },
  numberText: {
    fontSize: 30,
  },
});
