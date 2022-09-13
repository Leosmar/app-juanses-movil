import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold"
  }
});
export default Title;
