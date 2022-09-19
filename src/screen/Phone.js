import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescPhone from "../modal-screen/DescPhone";
const Phone = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(false);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-phone",
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
              ...item,
              deleteRoute: "delete-phone",
              controlForm,
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>
            {item.brand} {item.model}
          </Text>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescPhone
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        controlForm={controlForm}
        back="Inventory"
        getRoute="get-phone"
        title="Telefonos"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="model"
      ></ContainerSubRoutes>
    </>
  );
};

export default Phone;

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
