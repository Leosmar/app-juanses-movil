import { Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../helpers/colors";
import ModalSetValue from "./ModalSetValue";
const Products = ({
  item,
  selected,
  setSelectedItems,
  selectedItems,
  setProducts,
  products,
  search,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [cant, setCant] = useState(1);
  const [data, setData] = useState();

  const selectProducts = (product) => {
    if (selectedItems.includes(product.id)) {
      const newListProducts = products.filter((item) => item.id !== product.id);

      const newListItem = selectedItems.filter(
        (productId) => productId !== product.id
      );

      setProducts(newListProducts);
      setSelectedItems(newListItem);
      return;
    }

    setSelectedItems([...selectedItems, data.id]);

    setProducts([
      ...products,
      {
        ...data,
        value: product === "gift" ? data.totalValue : value,
        saleCant: cant,
      },
    ]);

    setIsInputVisible(false);
  };

  const setItemData = () => {
    setIsInputVisible(true);
    setValue(item.subjectValue);
    setData(item);
  };

  const filterProducts = () => {
    let searchText = search.toLowerCase();

    let filterText = (
      item?.imei1
        ? `${item.brand} ${item.model} ${item.imei1}`
        : `${item.typeProduct} ${item.name}`
    ).toLowerCase();

    return filterText.indexOf(searchText) !== -1;
  };

  const addAndSubstractCant = (operation, totalCant) => {
    if (operation === "add") {
      cant === totalCant ? setCant(cant) : setCant(cant + 1);
    } else {
      cant === 1 ? setCant(1) : setCant(cant - 1);
    }
  };

  return (
    <>
      {isInputVisible && (
        <ModalSetValue
          setIsInputVisible={setIsInputVisible}
          isInputVisible={isInputVisible}
          selectProducts={selectProducts}
          data={data}
          setValue={setValue}
          value={value}
          cant={cant}
          addAndSubstractCant={addAndSubstractCant}
        />
      )}

      {filterProducts() && (
        <TouchableOpacity
          style={{
            backgroundColor: selected
              ? colors.blueLigthColor
              : colors.secondColor,
            width: 500,
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}
          onPress={() => (selected ? selectProducts(item) : setItemData())}
        >
          <Text
            style={{
              color: colors.fontColor,
            }}
          >
            {item?.imei1
              ? `${item.brand} ${item.model} - IMEI 1: ${item.imei1}`
              : `${item.typeProduct} ${item.name}`}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Products;
