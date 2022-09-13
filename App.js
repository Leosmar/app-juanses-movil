import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import ManageRouts from "./src/components/ManageRouts";

const MyTheme = {
  colors: {
    primary: "",
    background: "",
    boder: "",
    card: "#202020",
    notification: "rgb(255, 59, 48)",
    text: "#fff",
  },
  dark: false,
};

function App() {
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <ManageRouts />
      </NavigationContainer>
    </>
  );
}

export default App;
