import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";


import Header from "./Header";
const Layout = ({ children, displayNone }) => {
  return (
    <>
      <StatusBar 
        backgroundColor="#202020"
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
    backgroundColor: "#202020",
    flex: 1,
  },
});
