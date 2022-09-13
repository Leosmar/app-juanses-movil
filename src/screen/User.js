import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescUser from "../modal-screen/DescUser";

const User = () => {
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
              password: item.password,
              rol: item.rol,
              deleteRoute: "delete-user",
              controlForm: "Control-user",
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>
            {item.name} - {item.rol === 1 ? "Administrador" : "Empleado"}
          </Text>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescUser
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        back="Register"
        add="Control-user"
        getRoute="get-user"
        title="Usuarios"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="name"
      ></ContainerSubRoutes>
    </>
  );
};

export default User;

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
