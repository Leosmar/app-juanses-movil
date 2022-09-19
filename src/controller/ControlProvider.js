import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";

const ControlProvider = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const [loader, setLoader] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [telf, setTelf] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [dir, setDir] = useState("");
  
  useEffect(() => {
    if (params) {
      setId(params.id);
      setName(params.name);
      setTelf(params.telf);
      setDni(params.dni);
      setEmail(params.email);
      setDir(params.dir);
    }
  }, [params]);

  const handleSubmit = async () => {
    if (name === "" || dni === "")
      return Alert.alert("Complete los campos obligatorios");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-provider",
        { name, telf, dni, email, dir },
        "Proveedor"
      );

      res && setloader(false);
      navigation.goBack();
    }
    if (params) {
      const res = await update(
        "put-provider",
        { id, name, telf, dni, email, dir },
        "Proveedor"
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
        <Title>{params ? "Editar" : "Registrar"} proveedor</Title>
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
        text="Correo electronico"
        placeholder=""
        contentType="text"
        data={email}
        keyboardType="email-address"
        event={setEmail}
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

export default ControlProvider;

const styles = StyleSheet.create({});
