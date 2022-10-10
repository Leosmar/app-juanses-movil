import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescSale from "../modal-screen/DescSale";
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
    const product = {};

    if (item.phoneId) {
      product.brand = item.brand;
      product.model = item.model;
    }
    if (item.otherproductId) {
      product.otherproductName = item.otherproductName;
      product.typeProduct = item.typeProduct;
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
              product,
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
            <Text style={styles.itemList}>
              {item.name}{" "}
              {product?.typeProduct
                ? `${product?.typeProduct} ${product?.otherproductName}`
                : `${product?.brand} ${product?.model}`}
            </Text>
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
      <DescSale
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
