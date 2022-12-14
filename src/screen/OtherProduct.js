import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import ContainerSubRoutes from "../components/ContainerSubRoutes";
import colors from "../helpers/colors";
import DescOtherProduct from "../modal-screen/DescOtherProduct";

const Provider = () => {
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(true);
  const [data, setData] = useState("");

  let controlForm = {
    route: "Control-form",
    screen: "Control-other-product",
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
              cant: JSON.stringify(item.cant),
              totalValue: JSON.stringify(item.totalValue),
              subjectValue: JSON.stringify(item.subjectValue),
              categoryId: item.categoryId,
              typeProduct: item.typeProduct,
              deleteRoute: "delete-other-product",
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
              {item.typeProduct} {item.name}
            </Text>
            <Text
              style={{
                color:
                  item.cant === 0 ? colors.errorColor : colors.successColor,
              }}
            >
              Cantidad {item.cant}
            </Text>
          </View>
          <View>{children}</View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DescOtherProduct
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        updateAfterDelete={updateAfterDelete}
        setUpdateAfterDelete={setUpdateAfterDelete}
      />
      <ContainerSubRoutes
        controlForm={controlForm}
        getRoute="get-other-product"
        title="Accesorios y mas"
        ListItem={ListItem}
        updateAfterDelete={updateAfterDelete}
        search="name"
      ></ContainerSubRoutes>
    </>
  );
};

export default Provider;

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
