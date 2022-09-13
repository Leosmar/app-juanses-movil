import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import {
  Input,
  SubmitButton,
  BackButton,
  ModalMultiSelect,
} from "../components/Inputs";
import Title from "../components/Title";

const ControlUser = ({ route }) => {
  const params = route.params;
  const [isVisibleRol, setIsVisibleRol] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [inputTextRol, setInputTextRol] = useState("");
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const cleanInputs = () => {
    setId("");
    setName("");
    setPassword("");
    setRol("");
    setLoader(false);
  };

  useEffect(() => {
    if (params) {
      setId(params.id);
      setName(params.name);
      setPassword(params.password);
      setRol(params.rol);
      setInputTextRol(params.rol === 1 ? "Admin" : "Empleado");
    } else {
      cleanInputs();
    }
  }, [params]);

  const handleSubmit = async () => {
    if (name === "" || password === "" || rol === "")
      return Alert.alert("Complete todos los campos");
    setLoader(true);

    if (!params) {
      const res = await register(
        "post-user",
        { name, password, rol },
        "Usuario"
      );
      !res ? cleanInputs() : "";
      navigation.navigate("User");
    }
    if (params) {
      const res = await update(
        "put-user",
        { id, name, password, rol },
        "Usuario"
      );

      !res ? cleanInputs() : "";
      navigation.navigate("User");
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
        <Title>{params ? "Editar" : "Registrar"} usuario</Title>
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
        text="Contraseña *"
        placeholder=""
        contentType="password"
        keyboardType="default"
        data={password}
        event={setPassword}
      />

      <ModalMultiSelect
        isVisible={isVisibleRol}
        setIsVisible={setIsVisibleRol}
        event={setRol}
        items={[
          { id: 1, name: "Administrador" },
          { id: 2, name: "Empleado" },
        ]}
        text="Permisos de usuario *"
        inputText={inputTextRol}
        setInputText={setInputTextRol}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Registrar usuario"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlUser;

const styles = StyleSheet.create({});
