import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import MultiSelectModal from "../modal-screen/MultiSelectModal";
import Title from "../components/Title";
import { useGetMultiSelect } from "../hooks/useGetMultiSelect";

const ControlBuyProduct = ({ route }) => {
  const params = route.params || null;
  const navigation = useNavigation();
  const [loader, setloader] = useState(false);
  const [id, setId] = useState("");
  const [barCode, setBarCode] = useState("");
  const [cant, setCant] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [paid, setPaid] = useState("");
  const [comment, setComment] = useState("");
  const provider = useGetMultiSelect("get-provider", "name");
  const category = useGetMultiSelect("get-category", "typeProduct");

  useEffect(() => {
    if (params) {
      setId(params.id);
      provider.setId(params.providerId);
      category.setId(params.categoryId);
      setBarCode(params.barCode);
      setCant(params.cant);
      setTotalValue(params.totalValue);
      setPaid(params.paid);
      setComment(params.comment);
      provider.setInputText(params.providerName);
      category.setInputText(params.categoryTypeProduct);
      setloader(false);
    }
  }, [params]);

  const handleSubmit = async () => {
    if (
      barCode === "" ||
      provider.id === "" ||
      category.id === "" ||
      totalValue === ""
    )
      return Alert.alert("Complete los campo obligatorio");

    setloader(true);

    if (!params) {
      const res = await register(
        "post-buy-product",
        {
          providerId: provider.id,
          categoryId: category.id,
          barCode,
          cant,
          totalValue,
          paid,
          comment,
        },
        "Pedido"
      );
      res && setloader(false);
      navigation.goBack();
    }

    if (params) {
      const res = await update(
        "put-buy-product",
        {
          id,
          providerId: provider.id,
          categoryId: category.id,
          barCode,
          cant,
          totalValue,
          paid,
          comment,
        },
        "Pedido"
      );

      res && setloader(false);
      navigation.goBack();
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <Layout displayNone={true}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BackButton HandleEvent={() => navigation.goBack()} />
          <Title>{params ? "Editar" : "Registrar"} pedido</Title>
        </View>

        <MultiSelectModal
          isVisible={provider.isVisible}
          setIsVisible={provider.setIsVisible}
          event={provider.setId}
          items={provider.multiSelect}
          text="Proveedores *"
          inputText={provider.inputText}
          setInputText={provider.setInputText}
          ifItemEmpity={{
            text: "proveedor",
            addRoute: "Control-provider",
          }}
        />

        <MultiSelectModal
          isVisible={category.isVisible}
          setIsVisible={category.setIsVisible}
          event={category.setId}
          items={category.multiSelect}
          text="Categorias *"
          inputText={category.inputText}
          setInputText={category.setInputText}
          ifItemEmpity={{
            text: "categoria",
            addRoute: "Control-category",
          }}
        />

        <Input
          contentType="number"
          data={barCode}
          event={setBarCode}
          keyboardType="numeric"
          text="Codigo de entrega *"
        />

        <Input
          contentType="number"
          data={cant}
          event={setCant}
          keyboardType="numeric"
          text="Cantidad de articulos"
        />

        <Input
          contentType="number"
          data={totalValue}
          event={setTotalValue}
          keyboardType="numeric"
          text="Valor total *"
        />
        <Input
          contentType="number"
          data={paid}
          event={setPaid}
          keyboardType="numeric"
          text="Abono"
        />

        <Input
          contentType="text"
          data={comment}
          event={setComment}
          keyboardType="text"
          text="Comentario"
        />

        <SubmitButton
          textContent={params ? "Guardar" : "Registrar"}
          HandleEvent={handleSubmit}
        />
      </View>
    </Layout>
  );
};

export default ControlBuyProduct;

const styles = StyleSheet.create({});
