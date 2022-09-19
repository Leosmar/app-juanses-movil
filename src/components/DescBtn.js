import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { deleteData } from "../api";

import { DeleteButton, UpdateButton } from "../components/Inputs";

const DescBtn = ({ data, setIsVisible, setUpdateAfterDelete }) => {
  const navigation = useNavigation();

  const handleDelete = async (id) => {
    await deleteData(data.deleteRoute, id);
    setUpdateAfterDelete(Math.random());
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 10 }}>
        <DeleteButton HandleEvent={() => handleDelete(data.id)} />
      </View>

      <UpdateButton
        HandleEvent={() =>
          navigation.navigate(data.controlForm.route, {
            screen: data.controlForm.screen,
            params: { ...data },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default DescBtn;
