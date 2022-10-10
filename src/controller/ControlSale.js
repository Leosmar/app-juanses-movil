import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";
import MultiSelectProducts from "../modal-screen/MultiSelectProducts/MultiSelectProducts";

const ControlSale = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [products, setProducts] = useState([]);
  console.log("original", products);
  useEffect(() => {
    if (params) {
    }
  }, [params]);

  const handleSubmit = async () => {
    if (false) return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    if (!params) {
      const res = await register("post-sale", {}, "Venta");

      res && setloader(false);
      navigation.goBack();
    }
    if (params) {
      const res = await update("put-sale", {}, "Venta");

      res && setloader(false);
      navigation.goBack();
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <Layout displayNone={true}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <BackButton HandleEvent={() => navigation.goBack()} />
        <Title>{params ? "Editar" : "Registrar"} venta</Title>
      </View>

      <MultiSelectProducts
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        products={products}
        setProducts={setProducts}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlSale;

const styles = StyleSheet.create({});
