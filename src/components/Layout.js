import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";

import Header from "./Header";
import colors from "../helpers/colors";

const Layout = ({ children, displayNone }) => {
  return (
    <>
      <StatusBar 
        backgroundColor={colors.mainColor}
      />
      <View style={styles.container}>
        {displayNone === true ? "" : <Header/>}
        {children}
      </View>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    flex: 1,
  },
});
