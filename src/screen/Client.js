import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescClient from "../modal-screen/DescClient";

const Client = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-client",
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
              name: item.name,
              lastName: item.lastName,
              telf: item.telf,
              dni: item.dni,
              dir: item.dir,
              deleteRoute: "delete-client",
              controlForm,
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>
            {item.name} {item.lastName}
          </Text>

          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescClient
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={data}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        controlForm={controlForm}
        back="Register"
        getRoute="get-client"
        title="Clientes"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="name"
      />
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
