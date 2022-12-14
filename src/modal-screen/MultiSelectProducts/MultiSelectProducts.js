import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import colors from "../../helpers/colors";
import { getData } from "../../api";
import Products from "./Products";
const MultiSelectProducts = ({
  isVisible,
  setIsVisible,
  products,
  setProducts,
  updated,
  isUpdated,
}) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const res = await getData("get-products-sale");
    let filterData;

    if (!updated) {
      filterData = res.filter(
        (product) => product?.stock === 1 || product.cant > 0
      );
    } else {
      const productsId = products.map((product) => product.id);

      filterData = res.filter(
        (product) =>
          product?.stock === 1 ||
          product.cant > 0 ||
          productsId.includes(product.id)
      );
    }

    setItems(filterData);
  };

  useEffect(() => {
    getProducts();
  }, [isUpdated]);

  useLayoutEffect(() => {
    if (!updated) return;
    let newItems = [];
    products.map((product, i) => {
      newItems.push(product.id);
    });

    setSelectedItems(newItems);
  }, [products, updated]);

  const getSelected = (product) => selectedItems.includes(product.id);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Selecionar productos *</Text>
      <TouchableOpacity
        style={[
          { backgroundColor: colors.secondColor, padding: 8, borderRadius: 5 },
        ]}
        onPress={() => setIsVisible(true)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.inputLabel}>
            Agrega productos de tu inventario
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={colors.fontColor}
          />
        </View>
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setIsVisible(false);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.mainColor,
              padding: 30,
              display: "flex",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "10%",
                }}
                onPress={() => setIsVisible(false)}
              >
                <AntDesign
                  name="arrowleft"
                  size={30}
                  color={colors.fontColor}
                />
              </TouchableOpacity>

              <TextInput
                placeholder="Buscar"
                placeholderTextColor="#000"
                value={search}
                onChangeText={setSearch}
                style={{
                  backgroundColor: colors.fontColor,
                  borderColor: "#000",
                  borderWidth: 1,
                  padding: 5,
                  color: "#000",
                  width: "90%",
                  borderRadius: 5,
                }}
              />
            </View>

            {items?.length > 0 ? (
              <FlatList
                data={items}
                keyExtractor={(item, index) => `${item.id}${index}`}
                renderItem={(item) => (
                  <Products
                    item={item.item}
                    selected={getSelected(item.item)}
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                    setProducts={setProducts}
                    products={products}
                    search={search}
                  />
                )}
              />
            ) : items?.isEmpity === true ? (
              <Text>No hay ningun producto registrado</Text>
            ) : (
              <ActivityIndicator color={colors.fontColor} size="large" />
            )}
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  inputLabel: {
    color: colors.fontColor,
  },
});
export default MultiSelectProducts;
