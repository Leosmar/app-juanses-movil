import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescSpent from "../modal-screen/DescSpent";
import colors from "../helpers/colors";

const Sale = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-sale",
  };

  useEffect(() => {
    setIsVisible(false);
  }, [isFocused]);

  const ListItem = ({ item, children }) => {

    const toggleOfbothofthem = {}

    if(item.phoneId){
        toggleOfbothofthem.brand = item.brand
        toggleOfbothofthem.model = item.model
    }
    if(item.otherproductId){
         toggleOfbothofthem.otherproductName = item.otherproductName
    } 


    return (
      <View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            setData({
              id: item.id,
              createdAt: item.createdAt,
              paymentType: item.paymentType,
              totalValue: JSON.stringify(item.totalValue),
              phoneId: item.phoneId,
              clientId: item.clientId,
              name: item.name,
              otherproductId: item.otherproductId,
              deleteRoute: "delete-sale",
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
            <Text style={styles.itemList}>{item.id} {item.name}</Text>
            <Text
              style={{
                color: colors.successColor,
              }}
            >
               +{item.totalValue}$
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
        getRoute="get-sale"
        title="Ventas"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="paymentType"
      />
    </>
  );
};

export default Sale;

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
