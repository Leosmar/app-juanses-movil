import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update, deleteData } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import {
  Input,
  SubmitButton,
  BackButton,
  DeleteButton,
} from "../components/Inputs";
import Title from "../components/Title";

const ControlClient = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const [loader, setLoader] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telf, setTelf] = useState("");
  const [dni, setDni] = useState("");
  const [dir, setDir] = useState("");

  const cleanInputs = () => {
    setId("");
    setName("");
    setLastName("");
    setTelf("");
    setDni("");
    setDir("");

    setLoader(false);
  };

  useEffect(() => {
    if (params) {
      setId(params.id);
      setName(params.name);
      setLastName(params.lastName);
      setTelf(params.telf);
      setDni(params.dni);
      setDir(params.dir);
    }
  }, [params]);

  const handleSubmit = async () => {
    if (name === "" || lastName === "" || dni === "")
      return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-client",
        { name, lastName, telf, dni, dir },
        "Cliente"
      );

      res && setloader(false);
      navigation.goBack();
    }
    if (params) {
      const res = await update(
        "put-client",
        { id, name, lastName, telf, dni, dir },
        "Cliente"
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
        <Title>{params ? "Editar" : "Registrar"} cliente</Title>
      </View>

      <Input
        text="Nombre *"
        placeholder=""
        contentType="text"
        data={name}
        keyboardType="default"
        event={setName}
      />
      <Input
        text="Apellido *"
        placeholder=""
        contentType="text"
        data={lastName}
        keyboardType="default"
        event={setLastName}
      />
      <Input
        text="Telefono"
        placeholder=""
        contentType="number"
        data={telf}
        keyboardType="numeric"
        event={setTelf}
      />
      <Input
        text="Documento de identificación *"
        placeholder=""
        contentType="text"
        data={dni}
        keyboardType="default"
        event={setDni}
      />
      <Input
        text="Dirección"
        placeholder=""
        contentType="textArea"
        data={dir}
        keyboardType="default"
        event={setDir}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlClient;

const styles = StyleSheet.create({});
