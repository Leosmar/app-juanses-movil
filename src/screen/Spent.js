import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescSpent from "../modal-screen/DescSpent";
import colors from "../helpers/colors";

const Spent = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-spent",
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
              typeSpent: item.typeSpent,
              totalValue: JSON.stringify(item.totalValue),
              comment: item.comment,
              deleteRoute: "delete-spent",
              controlForm,
            });
            setIsVisible(true);
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            <Text style={styles.itemList}>{item.typeSpent}</Text>
            <Text
              style={{
                color: colors.errorColor,
              }}
            >
               -{item.totalValue}$
            </Text>
          </View>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescSpent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={data}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />

      <ContainerSubRoutes
        controlForm={controlForm}
        getRoute="get-spent"
        title="Gastos"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="typeSpent"
      />
    </>
  );
};

export default Spent;

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
