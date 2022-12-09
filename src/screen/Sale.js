import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect, Children } from "react";
import { useIsFocused } from "@react-navigation/native";

import ContainerSubRoutes from "../components/ContainerSubRoutes";
import DescSale from "../modal-screen/DescSale";
import colors from "../helpers/colors";
import { FontAwesome } from "@expo/vector-icons";

const Sale = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");
  const [getRoute, setGetRoute] = useState("get-sale");

  let controlForm = {
    route: "Control-form",
    screen: "Control-sale",
  };

  useEffect(() => {
    setIsVisible(false);
  }, [isFocused]);

  const ListItem = ({ item, children }) => {
    let clientName = item[0].name;
    let paymentType = item[0].paymentType;
    let codeSale = item[0].codeSale;
    let sumTotalValue = item.reduce(
      (partialSum, a) => partialSum + a.totalValue * a.saleCant,
      0
    );
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setData({
            clientName,
            paymentType,
            codeSale,
            sumTotalValue,
            items: item,
            deleteRoute: "return-sale",
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
                : i === 2 && "..."}
              {i < 2 && ","}
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

  const ChangeRoute = () => {
    return (
      <View>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() =>
            setGetRoute((oldData) => {
              oldData === "get-sale"
                ? setGetRoute("get-cancel-sale")
                : setGetRoute("get-sale");
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
      {isVisible && (
        <DescSale
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          data={data}
          setUpdateAfterDelete={setUpdateAfterDelete}
          removeBtn={getRoute === "get-sale" ? false : true}
        />
      )}

      <ContainerSubRoutes
        controlForm={controlForm}
        getRoute={getRoute}
        title={` Ventas ${getRoute === "get-sale" ? "" : "canceladas"}`}
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="paymentType"
        ChangeRoute={ChangeRoute}
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
