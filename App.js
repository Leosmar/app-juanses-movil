import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import colors from "./src/helpers/colors";
import ManageRouts from "./src/components/ManageRouts";

const MyTheme = {
  colors: {
    primary: "",
    background: "",
    boder: "",
    card: colors.mainColor,
    notification: "rgb(255, 59, 48)",
    text: colors.fontColor,
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
