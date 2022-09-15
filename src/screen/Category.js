import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescCategory from "../modal-screen/DescCategory";
const Client = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

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
              typeProduct: item.typeProduct,
              deleteRoute: "delete-category",
              controlForm: "Control-category",
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>{item.typeProduct}</Text>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescCategory
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        add="Control-category"
        back="Inventory"
        getRoute="get-category"
        title="Categorias"
        ListItem={ListItem}
        search="typeProduct"
        updateAfterDelete={updateAfterDelete}
      ></ContainerSubRoutes>
    </>
  );
};

export default Client;

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
