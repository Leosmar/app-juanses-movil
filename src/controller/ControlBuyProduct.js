import { StyleSheet, View, Alert, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { getData, register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import MultiSelectModal from "../modal-screen/MultiSelectModal";
import Title from "../components/Title";

const ControlBuyProduct = ({ route }) => {
  const params = route.params || null;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isVisibleProvider, setIsVisibleProvider] = useState(false);
  const [isVisibleCategory, setIsVisibleCategory] = useState(false);

  const [id, setId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [barCode, setBarCode] = useState("");
  const [cant, setCant] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [paid, setPaid] = useState("");
  const [comment, setComment] = useState("");

  const [inputTextProvider, setInputTextProvider] = useState("");
  const [inputTextCategory, setInputTextCategory] = useState("");

  const [categoryMultiSelect, setCategoryMultiSelect] = useState([]);
  const [providerMultiSelect, setProviderMultiSelect] = useState([]);

  const [loader, setloader] = useState(false);

  const cleanInputs = () => {
    setId("");
    setProviderId("");
    setCategoryId("");
    setBarCode("");
    setCant("");
    setTotalValue("");
    setPaid("");
    setProviderMultiSelect([]);
    setCategoryMultiSelect([]);
    setInputTextProvider("");
    setInputTextCategory("");
    setComment("");
    setloader(false);
  };

  const getDataMultiSelect = async () => {
    const resProvider = await getData("get-provider");
    if (resProvider?.isEmpity !== true) {
      const filterProvider = resProvider.map((e) => {
        return { id: e.id, name: e.name };
      });
      setProviderMultiSelect(filterProvider);
    }
    if (resProvider?.isEmpity === true) {
      setProviderMultiSelect(resProvider);
    }

    const resCategory = await getData("get-category");
    if (resCategory?.isEmpity !== true) {
      const filterCategory = resCategory.map((e) => {
        return { id: e.id, name: e.typeProduct };
      });
      setCategoryMultiSelect(filterCategory);
    }
    if (resCategory?.isEmpity === true) {
      setCategoryMultiSelect(resCategory);
    }
  };

  useEffect(() => {
    if (params) {
      setId(params.id);
      setProviderId(params.providerId);
      setCategoryId(params.categoryId);
      setBarCode(params.barCode);
      setCant(params.cant);
      setTotalValue(params.totalValue);
      setPaid(params.paid);
      setComment(params.comment);
      setInputTextProvider(params.providerName);
      setInputTextCategory(params.categoryTypeProduct);
      setloader(false);
    } else {
      cleanInputs();
    }
  }, [params]);

  useEffect(() => {
    if (isFocused === true) {
      getDataMultiSelect();
      setIsVisibleProvider(false);
      setIsVisibleCategory(false);
    }
  }, [isFocused]);

  const handleSubmit = async () => {
    if (
      barCode === "" ||
      providerId === "" ||
      categoryId === "" ||
      totalValue === ""
    )
      return Alert.alert("Complete el campo obligatorio");

    setloader(true);

    if (!params) {
      const res = await register(
        "post-buy-product",
        { providerId, categoryId, barCode, cant, totalValue, paid, comment },
        "Pedido"
      );
      !res ? cleanInputs() : "";
      navigation.goBack();
    }
    if (params) {
      const res = await update(
        "put-buy-product",
        {
          id,
          providerId,
          categoryId,
          barCode,
          cant,
          totalValue,
          paid,
          comment,
        },
        "Pedido"
      );

      !res ? cleanInputs() : "";
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
          isVisible={isVisibleProvider}
          setIsVisible={setIsVisibleProvider}
          event={setProviderId}
          items={providerMultiSelect}
          text="Proveedores *"
          inputText={inputTextProvider}
          setInputText={setInputTextProvider}
          ifItemEmpity={{
            text: "proveedor",
            addRoute: "Control-provider",
          }}
        />

        <MultiSelectModal
          isVisible={isVisibleCategory}
          setIsVisible={setIsVisibleCategory}
          event={setCategoryId}
          items={categoryMultiSelect}
          text="Categorias *"
          inputText={inputTextCategory}
          setInputText={setInputTextCategory}
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
          textContent={params ? "Editar" : "Registrar"}
          HandleEvent={handleSubmit}
        />
      </View>
    </Layout>
  );
};

export default ControlBuyProduct;

const styles = StyleSheet.create({});
