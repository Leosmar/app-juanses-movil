import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";

import DesOneItem from "../modal-screen/DescOneItem";

const Model = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-one-item",
    titleText: "Modelo",
    dataBaseCol: "model",
  };

  useEffect(() => {
    setIsVisible(false);
  }, [isFocused]);

  const ListItem = ({ item, children }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            setData({
              id: item.id,
              value: item.model,
              deleteRoute: "delete-model",
              controlForm: { ...controlForm, putApi: "put-model" },
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>{item.model}</Text>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DesOneItem
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        controlForm={{ ...controlForm, postApi: "post-model" }}
        back="Inventory"
        getRoute="get-model"
        title="Modelos de telefonos"
        ListItem={ListItem}
        search="model"
        updateAfterDelete={updateAfterDelete}
      ></ContainerSubRoutes>
    </>
  );
};

export default Model;

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemList: {
    color: "#fff",
  },
});
