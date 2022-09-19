import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";

import DesOneItem from "../modal-screen/DescOneItem";

const Brand = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-one-item",
    titleText: "Marca",
    dataBaseCol: "brand",
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
              value: item.brand,
              deleteRoute: "delete-brand",
              controlForm: { ...controlForm, putApi: "put-brand" },
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>{item.brand}</Text>
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
        controlForm={{ ...controlForm, postApi: "post-brand" }}
        back="Inventory"
        getRoute="get-brand"
        title="Marcas de telefonos"
        ListItem={ListItem}
        search="brand"
        updateAfterDelete={updateAfterDelete}
      ></ContainerSubRoutes>
    </>
  );
};

export default Brand;

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
