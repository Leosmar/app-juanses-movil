import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../helpers/colors";

const TotalCashRegister = ({ total }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.titleText]}>Utilidad Total</Text>
      <Text style={[styles.text, styles.numberText]}>
        {total ? `${total}$` : <ActivityIndicator />}
      </Text>
    </View>
  );
};

export default TotalCashRegister;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90%",
    backgroundColor: colors.secondColor,
    borderRadius: 10,
  },
  text: {
    color: colors.fontColor,
  },
  titleText: {
    fontSize: 20,
  },
  numberText: {
    fontSize: 40,
  },
});
