import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";
import MultiSelectProducts from "../modal-screen/MultiSelectProducts/MultiSelectProducts";
import MultiSelectModal from "../modal-screen/MultiSelectModal";
import { useGetMultiSelect } from "../hooks/useGetMultiSelect";
import { useSetProducts } from "../hooks/useSetProducts";

const ControlSale = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const [loader, setLoader] = useState(false);

  const products = useSetProducts();
  const client = useGetMultiSelect("get-client", "name");
  const paymentType = useGetMultiSelect("", {}, [
    { id: "Efectivo", name: "Efectivo" },
    { id: "Divisas", name: "Divisas" },
    { id: "Transferencia", name: "Transferencia" },
    { id: "Punto de venta", name: "Punto de venta" },
  ]);
  console.log("original", products.products);

  useEffect(() => {
    if (params) {
      // get cant and totalValue from api
    }
  }, [params]);

  const handleSubmit = async () => {
    if (!products.products || !paymentType.id || !client.id)
      return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-sale",
        {
          products: products.products,
          clientId: client.id,
          paymentType: paymentType.id,
        },
        "Venta"
      );

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
        isVisible={products.isVisible}
        setIsVisible={products.setIsVisible}
        products={products.products}
        setProducts={products.setProducts}
      />

      <MultiSelectModal
        event={client.setId}
        inputText={client.inputText}
        setInputText={client.setInputText}
        isVisible={client.isVisible}
        setIsVisible={client.setIsVisible}
        items={client.multiSelect}
        text="Cliente *"
        ifItemEmpity={{
          text: "Cliente",
          addRoute: "Control-client",
        }}
      />

      <MultiSelectModal
        event={paymentType.setId}
        inputText={paymentType.inputText}
        setInputText={paymentType.setInputText}
        isVisible={paymentType.isVisible}
        setIsVisible={paymentType.setIsVisible}
        items={paymentType.multiSelect}
        text="Metodo de pago *"
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
