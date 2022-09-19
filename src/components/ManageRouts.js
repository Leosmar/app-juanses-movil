import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getSession } from "../helpers/userSession";
import { UserContext } from "../hooks/UserContext";

//Routes
import LoginScreen from "../screen/LoginScreen";
import TabBar from "./TabBar";

//Hidden tabBar routes
import User from "../screen/User";
import Provider from "../screen/Provider";
import Client from "../screen/Client";
import Category from "../screen/Category";
import BuyProducts from "../screen/BuyProduct";
import Phone from "../screen/Phone";
import Brand from "../screen/Brand";
import ControlForm from "../controller/ControlForm";
import Model from "../screen/Model";

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
          <Stack.Screen name="Control-form" component={ControlForm} />

          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Provider" component={Provider} />
          <Stack.Screen name="Client" component={Client} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Buy-product" component={BuyProducts} />
          <Stack.Screen name="Brand" component={Brand} />
          <Stack.Screen name="Model" component={Model} />
          <Stack.Screen name="Phone" component={Phone} />
        
        </Stack.Navigator>
      )}
    </UserContext.Provider>
  );
}

export default ManageRouts;
