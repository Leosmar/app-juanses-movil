import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";
import MultiSelectModal from "../modal-screen/MultiSelectModal";
import { useGetMultiSelect } from "../hooks/useGetMultiSelect";

const ControlOtherProduct = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const [loader, setLoader] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cant, setCant] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const category = useGetMultiSelect("get-category", "typeProduct");

  useEffect(() => {
    if (params) {
      setId(params.id);
      setName(params.name);
      setCant(params.cant);
      setTotalValue(params.totalValue);
      setSubjectValue(params.subjectValue);
      category.setInputText(params.typeProduct);
      category.setId(params.categoryId);
    }
  }, [params]);

  const handleSubmit = async () => {
    if (name === "" || totalValue === "" || category.id === "")
      return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-other-product",
        { name, cant, totalValue, subjectValue, categoryId: category.id },
        category.inputText
      );

      res && setloader(false);
      navigation.goBack();
    }
    if (params) {
      const res = await update(
        "put-other-product",
        { id, name, cant, totalValue, subjectValue, categoryId: category.id },
        params.typeProduct
      );

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
        <Title>{params ? "Editar" : "Registrar"} Accesorio/Otro</Title>
      </View>

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
        text="Nombre *"
        placeholder=""
        contentType="text"
        data={name}
        keyboardType="default"
        event={setName}
      />
      <Input
        text="Cantidad"
        placeholder=""
        contentType="number"
        data={cant}
        keyboardType="numeric"
        event={setCant}
      />
      <Input
        text="Valor (c/u)"
        placeholder=""
        contentType="text"
        data={totalValue}
        keyboardType="default"
        event={setTotalValue}
      />
      <Input
        text="Precio de venta sugerido (c/u)"
        placeholder=""
        contentType="text"
        data={subjectValue}
        keyboardType="email-address"
        event={setSubjectValue}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlOtherProduct;

const styles = StyleSheet.create({});
