import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import Title from "../components/Title";

const ControlOneItem = ({ route }) => {
  const params = route.params;
  let putApi = params.controlForm?.putApi;
  let postApi = params.controlForm?.postApi;
  let dataBaseCol = params.controlForm.dataBaseCol;
  let titleText = params.controlForm?.titleText;

  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [loader, setloader] = useState(false);

  useEffect(() => {
    if (putApi) {
      setId(params.id);
      setValue(params.value);
    }
  }, [putApi]);

  const handleSubmit = async () => {
    if (value === "") return Alert.alert("Complete el campo obligatorio");

    setloader(true);

    if (postApi) {
      const res = await register(
        postApi,
        { [dataBaseCol]: value },
        titleText
      );
      res && setloader(false);
      navigation.goBack();
    }

    if (putApi) {
      const res = await update(
        putApi,
        { id, [dataBaseCol]: value },
        titleText
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
        <Title>
          {putApi ? "Editar" : "Registrar"} {titleText}
        </Title>
      </View>

      <Input
        text={`${titleText} *`}
        placeholder=""
        contentType="text"
        data={value}
        keyboardType="default"
        event={setValue}
      />

      <SubmitButton
        textContent={putApi ? "Editar" : "Registrar"}
        HandleEvent={handleSubmit}
      />
    </Layout>
  );
};

export default ControlOneItem;

const styles = StyleSheet.create({});
