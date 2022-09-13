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
              brand: item.brand,
              model: item.model,
              color: item.color,
              imei1: item.imei1,
              imei2: item.imei2,
              ram: item.ram,
              rom: item.rom,
              totalValue: item.totalValue,
              subjectValue: item.subjectValue,
              stock: item.stock,
              buyProductId: item.buyProductId,
              deleteRoure: "delete-phone",
              controlForm: "Control-phone",
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>{item.brand} {item.model}</Text>
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
        add="Control-phone"
        back="Inventory"
        getRoute="get-phone"
        title="Telefonos"
        ListItem={ListItem}
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
