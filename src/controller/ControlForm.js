import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ControlUser from "./ControlUser";
import ControlProvider from "./ControlProvider";
import ControlClient from "./ControlClient";
import ControlOneItem from "./ControlOneItem";
import ControlBuyProduct from "./ControlBuyProduct";
import ControlPhone from "./ControlPhone";

const ControlForm = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Control-user" component={ControlUser} />
      <Stack.Screen name="Control-provider" component={ControlProvider} />
      <Stack.Screen name="Control-client" component={ControlClient} />
      <Stack.Screen name="Control-buy-product" component={ControlBuyProduct} />
      <Stack.Screen name="Control-phone" component={ControlPhone} />
      <Stack.Screen name="Control-one-item" component={ControlOneItem} />

    </Stack.Navigator>
  );
};

export default ControlForm;
