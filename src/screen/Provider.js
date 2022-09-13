import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescProvider from "../modal-screen/DescProvider";

const Provider = () => {
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
              name: item.name,
              telf: item.telf,
              dni: item.dni,
              email: item.email,
              dir: item.dir,
              deleteRoute: "delete-provider",
              controlForm: "Control-provider",
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>{item.name}</Text>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescProvider
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        add="Control-provider"
        back="Register"
        getRoute="get-provider"
        title="Proveedores"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="name"
      ></ContainerSubRoutes>
    </>
  );
};

export default Provider;

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
