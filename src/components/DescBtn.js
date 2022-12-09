import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { deleteData } from "../api";

import { DeleteButton, ReturnBtn, UpdateButton } from "../components/Inputs";

const DescBtn = ({ data, setIsVisible, setUpdateAfterDelete }) => {
  const navigation = useNavigation();

  let id = data?.items ? data.items[0].codeSale : data.id;

  const handleDeleteOrReturn = async (id) => {
    await deleteData(data.deleteRoute, id);
    setUpdateAfterDelete(Math.random());
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {data.deleteRoute.includes("return") ? (
        <ReturnBtn HandleEvent={() => handleDeleteOrReturn(id)} />
      ) : (
        <>
          <View style={{ paddingLeft: 10 }}>
            <DeleteButton HandleEvent={() => handleDeleteOrReturn(id)} />
          </View>

          <UpdateButton
            HandleEvent={() =>
              navigation.navigate(data.controlForm.route, {
                screen: data.controlForm.screen,
                params: { ...data },
              })
            }
          />
        </>
      )}
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
