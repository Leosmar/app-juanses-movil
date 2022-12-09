import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import Layout from "../components/Layout";
import BtnBottom from "../components/transaction/BtnBottom";
import Title from "../components/Title";
import HomeBtn from "../components/home-btn/HomeBtn";
const Home = () => {
  
  const listOfBtns = [
    {
      content: "Usuarios",
      iconName: "adduser",
      size: 26,
      screenRoute: "User",
      controlForm: {
        route: "Control-form",
        screen: "Control-user",
      },
    },
    {
      content: "clientes",
      iconName: "addusergroup",
      size: 26,
      screenRoute: "Client",
      controlForm: {
        route: "Control-form",
        screen: "Control-client",
      },
    },
    {
      content: "Proveedores",
      iconName: "isv",
      size: 26,
      screenRoute: "Provider",
      controlForm: {
        route: "Control-form",
        screen: "Control-provider",
      },
    },
    ,
    {
      content: "Pedidos",
      iconName: "shoppingcart",
      size: 26,
      screenRoute: "Buy-product",
      controlForm: {
        route: "Control-form",
        screen: "Control-buy-product",
      },
    },
    {
      content: "Telefonos",
      iconName: "mobile1",
      size: 26,
      screenRoute: "Phone",
      controlForm: {
        route: "Control-form",
        screen: "Control-phone",
      },
    },
    {
      content: "Accesorios",
      iconName: "staro",
      size: 26,
      screenRoute: "Other-product",
      controlForm: {
        route: "Control-form",
        screen: "Control-other-product",
      },
    },
  ];

  return (
    <Layout>
      <View style={styles.container}>
        <Title children="Gestiona tu negocio" />
        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {listOfBtns.map(
            ({ content, iconName, size, screenRoute, controlForm }) => {
              return (
                <HomeBtn
                  key={content}
                  content={content}
                  iconName={iconName}
                  size={size}
                  screenRoute={screenRoute}
                  controlForm={controlForm}
                />
              );
            }
          )}
        </View>
      </View>
      <BtnBottom />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
