import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { getDataById, register, update } from "../api";
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
  const [isUpdated, setIsUpdated] = useState(false);
  const [updateCodeSale, setUpdateCodeSale] = useState(null);

  const products = useSetProducts();
  const client = useGetMultiSelect("get-client", "name");
  const paymentType = useGetMultiSelect("", {}, [
    { id: "Efectivo", name: "Efectivo" },
    { id: "Divisas", name: "Divisas" },
    { id: "Transferencia", name: "Transferencia" },
    { id: "Punto de venta", name: "Punto de venta" },
  ]);
  //console.log("original", products.products);

  const getProductsById = async (id) => {
    const product = await getDataById("get-products-by-id", id);
    return product;
  };

  const setProductsToUpdate = async (productsList) => {
    const setData = [];
    await Promise.all(
      productsList.map(async (product, i) => {
        if (product?.phoneId) {
          const dataById = await getProductsById(product.phoneId);

          if (dataById[0].id === product.phoneId) {
            const data = {
              id: dataById[0].id,
              saleCant: product.saleCant,
              subjectValue: dataById[0].subjectValue,
              value: product.totalValue,
              totalValue: dataById[0].totalValue,
              brand: product.product.brand,
              model: product.product.model,
              color: dataById[0].color,
              imei1: dataById[0].imei1,
              imei2: dataById[0].imei2,
              stock: dataById[0].stock,
              codeSale: params.codeSale,
            };
            setData.push(data);
          }
        }
        if (product?.otherproductId) {
          const dataById = await getProductsById(product.otherproductId);
          if (dataById[0].id === product.otherproductId) {
            const data = {
              id: dataById[0].id,
              saleCant: product.saleCant,
              subjectValue: dataById[0].subjectValue,
              value: product.totalValue,
              totalValue: dataById[0].totalValue,
              cant: dataById[0].cant,
              name: product.product.otherproductName,
              typeProduct: product.product.typeProduct,
              codeSale: params.codeSale,
            };

            setData.push(data);
          }
        }
      })
    );
    products.setProducts(setData);
    setUpdateCodeSale(setData[0]?.codeSale || null);
    setIsUpdated(true);
  };

  useEffect(() => {
    if (!params) return;
    setProductsToUpdate(params.items);
    client.setId(params.items[0].clientId);
    client.setInputText(params.clientName);
    paymentType.setId(params.paymentType);
    paymentType.setInputText(params.paymentType);
  }, [params]);

  const handleSubmit = async () => {
    if (!products.products || !paymentType.id || !client.id)
      return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    try {
      if (!params) {
        await register(
          "post-sale",
          {
            products: products.products,
            clientId: client.id,
            paymentType: paymentType.id,
          },
          "Venta"
        );
        navigation.goBack();
      }
      if (params) {
        await register(
          "put-sale",
          {
            products: products.products,
            clientId: client.id,
            paymentType: paymentType.id,
            updateCodeSale,
          },
          "Actualizacion"
        );
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoader(false);
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
        updated={params}
        isUpdated={isUpdated}
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
        textContent={params ? "Guardar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlSale;

const styles = StyleSheet.create({});
