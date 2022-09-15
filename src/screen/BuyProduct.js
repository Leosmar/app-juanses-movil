import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";

import DescBuyProduct from "../modal-screen/DescBuyProduct";

const BuyProducts = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    setIsVisible(false);
  }, [isFocused]);

  const ListItem = ({ item, children }) => {
    let providerName = item.provider !== null ? item.provider.name : "null";
    let categoryTypeProduct =
      item.category !== null ? item.category.typeProduct : "null";

    return (
      <View>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            setData({
              id: item.id,
              providerId: item.providerId,
              providerName,
              categoryId: item.categoryId,
              categoryTypeProduct,
              barCode: JSON.stringify(item.barCode),
              cant: JSON.stringify(item.cant),
              totalValue: JSON.stringify(item.totalValue),
              paid: JSON.stringify(item.paid),
              comment: item.comment,
              deleteRoute: "delete-buy-product",
              controlForm: "Control-buy-product",
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
        add="Control-buy-product"
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
    color: "#fff",
  },
});
