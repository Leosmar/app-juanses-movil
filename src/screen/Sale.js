import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect, Children } from "react";
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
    let clientName = item[0].name;
    let sumTotalValue = item.reduce(
      (partialSum, a) => partialSum + a.totalValue,
      0
    );
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setData({
            clientName,
            sumTotalValue,
            items: item,
            deleteRoute: "delete-sale",
            controlForm,
          });
          setIsVisible(true);
        }}
      >
        <Text style={styles.itemList}>{clientName} </Text>
        {item.map((product, i) => {
          return (
            <Text
              key={product.id}
              style={[
                styles.itemList,
                {
                  marginLeft: 10,
                },
              ]}
            >
              {i < 2
                ? product.product.typeProduct
                  ? `- ${product.product?.typeProduct} ${product.product?.otherproductName}`
                  : `- ${product.product?.brand} ${product.product?.model}`
                : "..."}
              {i < item.length - 1 && ","}
            </Text>
          );
        })}
        <Text
          style={{
            position: "absolute",
            right: 5,
          }}
        >
          {children}
        </Text>
        <Text style={{ color: colors.successColor, paddingTop: 5 }}>
          Total: +{sumTotalValue}$
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isVisible && (
        <DescSale
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          data={data}
          setUpdateAfterDelete={setUpdateAfterDelete}
        />
      )}

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
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  itemList: {
    color: colors.fontColor,
    fontSize: 12,
  },
});
