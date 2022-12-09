import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescPhone from "../modal-screen/DescPhone";
import colors from "../helpers/colors";
import { FontAwesome } from "@expo/vector-icons";

const Phone = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(false);
  const [data, setData] = useState("");
  const [getRoute, setGetRoute] = useState("get-phone");

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

  const ChangeRoute = () => {
    return (
      <View>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() =>
            setGetRoute((oldData) => {
              oldData === "get-phone"
                ? setGetRoute("get-phone-sale")
                : setGetRoute("get-phone");
            })
          }
        >
          <FontAwesome name="exchange" size={28} color={colors.fontColor} />
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
        removeBtn={getRoute === "get-phone" ? false : true}
      />

      <ContainerSubRoutes
        controlForm={controlForm}
        back="Inventory"
        getRoute={getRoute}
        title={`Telefonos ${
          getRoute === "get-phone" ? "disponible" : "Vendidos"
        }`}
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="model"
        ChangeRoute={ChangeRoute}
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
    color: colors.fontColor,
  },
});
