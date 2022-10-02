import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../helpers/colors";

const Title = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 24,
    color: colors.fontColor,
    fontWeight: "bold"
  }
});
export default Title;
