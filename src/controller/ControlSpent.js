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

const ControlSpent = ({ route }) => {
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const params = route.params;

  const [id, setId] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [comment, setComment] = useState("");

  //   const [typeSpent, setTypeSpent] = useState("");
  //   const [inputTextRol, setInputTextRol] = useState("");
  //   const [isVisibleTypeSpent, setIsVisibleTypeSpent] = useState(false);

  const typeSpent = useGetMultiSelect("", {}, [
    { id: "Sevicios públicos", name: "Sevicios públicos" },
    {
      id: "Compre de productos en insumos",
      name: "Compre de productos en insumos",
    },
    { id: "Arriendo", name: "Arriendo" },
    { id: "Nómina", name: "Nómina" },
    { id: "Gasto administrativos", name: "Gasto administrativos" },
    { id: "Mercadeo y publicidad", name: "Mercadeo y publicidad" },
    {
      id: "Transporte, domicilios y logística",
      name: "Transporte, domicilios y logística",
    },
    {
      id: "Mantenimiento y reparaciones",
      name: "Mantenimiento y reparaciones",
    },
    {
      id: "Muebles, equipos y otra maquinaria",
      name: "Muebles, equipos y otra maquinaria",
    },
    { id: "Otros", name: "Otros" },
  ]);

  useEffect(() => {
    if (params) {
      setId(params.id);
      setTotalValue(params.totalValue);
      setComment(params.comment);
      typeSpent.setId(params.typeSpent);
      typeSpent.setInputText(params.typeSpent);
    }
  }, [params]);

  const handleSubmit = async () => {
    console.log(totalValue, comment, typeSpent.id);
    if (totalValue < 1 || typeSpent.id === "")
      return Alert.alert("Complete todos los campos");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-spent",
        { totalValue, comment, typeSpent: typeSpent.id },
        "Gasto"
      );
      res && setloader(false);
      navigation.goBack();
    }
    if (params) {
      const res = await update(
        "put-spent",
        { id, totalValue, comment, typeSpent: typeSpent.id },
        "Gasto"
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
        <Title>{params ? "Editar" : "Agregar"} Gasto</Title>
      </View>

      <MultiSelectModal
        isVisible={typeSpent.isVisible}
        setIsVisible={typeSpent.setIsVisible}
        event={typeSpent.setId}
        items={typeSpent.multiSelect}
        text="Categoria del gasto *"
        inputText={typeSpent.inputText}
        setInputText={typeSpent.setInputText}
      />

      <Input
        text="Valor *"
        placeholder=""
        contentType="numeric"
        data={totalValue}
        keyboardType="numeric"
        event={setTotalValue}
      />

      <Input
        text="Commentario *"
        placeholder=""
        contentType="text"
        keyboardType="default"
        data={comment}
        event={setComment}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Agregar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlSpent;

const styles = StyleSheet.create({});
