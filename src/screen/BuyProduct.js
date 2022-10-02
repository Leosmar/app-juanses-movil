import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";

import DescBuyProduct from "../modal-screen/DescBuyProduct";
import colors from "../helpers/colors";

const BuyProducts = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-buy-product",
  };

  useEffect(() => {
    setIsVisible(false);
  }, [isFocused]);

  const ListItem = ({ item, children }) => {
    let providerName =
      item?.provider !== null ? item?.provider?.name : "ELIMINADO";

    let categoryTypeProduct =
      item?.category !== null ? item?.category?.typeProduct : "ELIMINADO";

    return (
      <View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            setData({
              id: item.id,
              providerId: item.providerId || "null",
              providerName,
              categoryId: item.categoryId || "null",
              categoryTypeProduct,
              barCode: JSON.stringify(item.barCode),
              cant: JSON.stringify(item.cant),
              totalValue: JSON.stringify(item.totalValue),
              paid: JSON.stringify(item.paid),
              comment: item.comment,
              deleteRoute: "delete-buy-product",
              controlForm,
            });
            setIsVisible(true);
          }}
        >
          <Text style={styles.itemList}>
            {providerName} - {categoryTypeProduct}
          </Text>

          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescBuyProduct
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={data}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        controlForm={controlForm}
        back="Inventory"
        getRoute="get-buy-product"
        title="Pedidos"
        ListItem={ListItem}
        search="providerId"
        updateAfterDelete={updateAfterDelete}
      ></ContainerSubRoutes>
    </>
  );
};

export default BuyProducts;

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
