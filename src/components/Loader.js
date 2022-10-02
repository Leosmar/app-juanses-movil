import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import colors from "../helpers/colors";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
});
