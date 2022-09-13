import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getSession } from "../helpers/userSession";
import { UserContext } from "../hooks/UserContext";

//Routes
import LoginScreen from "../screen/LoginScreen";
import TabBar from "./TabBar";

//Hidden tabBar routes
import User from "../screen/User";
import ControlUser from "../controller/ControlUser";

import Provider from "../screen/Provider";
import ControlProvider from "../controller/ControlProvider";

import Client from "../screen/Client";
import ControlClient from "../controller/ControlClient";

import Category from "../screen/Category";
import ControlCategory from "../controller/ControlCategory";

import BuyProducts from "../screen/BuyProduct";
import ControlBuyProduct from "../controller/ControlBuyProduct";

import Phone from "../screen/Phone";
import ControlPhone from "../controller/ControlPhone";

function ManageRouts() {
  const Stack = createNativeStackNavigator();

  const [userLogin, setUserLogin] = useState({ status: null, rol: null });

  const getData = async () => {
    const data = await getSession();
    if (userLogin.status == null && data !== null) setUserLogin(data);
  };

  useEffect(() => {
    getData();

    return () => {};
  }, [userLogin]);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {userLogin.status == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              animation: "slide_from_left",
            }}
          />
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Tab-bar" component={TabBar} />

          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Control-user" component={ControlUser} />

          <Stack.Screen name="Provider" component={Provider} />
          <Stack.Screen name="Control-provider" component={ControlProvider} />

          <Stack.Screen name="Client" component={Client} />
          <Stack.Screen name="Control-client" component={ControlClient} />

          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Control-category" component={ControlCategory} />

          <Stack.Screen name="Buy-product" component={BuyProducts} />
          <Stack.Screen
            name="Control-buy-product"
            component={ControlBuyProduct}
          />

          <Stack.Screen name="Phone" component={Phone}/>
          <Stack.Screen name="Control-phone" component={ControlPhone}/>

        </Stack.Navigator>
      )}
    </UserContext.Provider>
  );
}


export default ManageRouts;
