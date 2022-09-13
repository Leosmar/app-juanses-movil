import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";

const ControlCategory = ({ route }) => {
  const params = route.params;

  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [loader, setloader] = useState(false);

  const cleanInputs = () => {
    setId("");
    setTypeProduct("");
    setloader(false);
  };

  useEffect(() => {
    if (params) {
      setId(params.id);
      setTypeProduct(params.typeProduct);
      
    } else {
      cleanInputs();
    }
  }, [params]);

  const handleSubmit = async () => {


    if (typeProduct === "") return Alert.alert("Complete el campo obligatorio");
    
    setloader(true)

    if (!params) {
        
      const res = await register("post-category", { typeProduct }, "Categoria");
      !res ? cleanInputs() : "";
      navigation.navigate("Category");
    }
    if (params) {
      const res = await update(
        "put-category",
        { id, typeProduct },
        "Categoria"
      );

      !res ? cleanInputs() : "";
      navigation.navigate("Category");
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
        <Title>{params ? "Editar" : "Registrar"} Categoria</Title>
      </View>

      <Input
        text="Categoria *"
        placeholder=""
        contentType="text"
        data={typeProduct}
        keyboardType="default"
        event={setTypeProduct}
      />

      <SubmitButton
        textContent={params ? "Editar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlCategory;

const styles = StyleSheet.create({});
