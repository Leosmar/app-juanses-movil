import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import DescBtn from "../components/DescBtn";
import colors from "../helpers/colors";

const DescSale = ({
  isVisible,
  setIsVisible,
  data,
  setUpdateAfterDelete,
  removeBtn,
}) => {
  let paymentType = data.paymentType || "No encontrado";

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={{
          backgroundColor: "rgba(0,0,0, 0.25)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View></View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text
          style={[
            {
              fontWeight: "bold",
              padding: 5,
              fontSize: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#ccc",
              marginBottom: 20,
            },
            styles.textColor,
          ]}
        >
          {data.clientName}
        </Text>

        {data.items.map((product) => {
          console.log(product);
          return (
            <Text
              key={product.id}
              style={[
                styles.itemText,
                styles.textColor,
                {
                  marginLeft: 10,
                },
              ]}
            >
              {product.product.typeProduct
                ? `- ${product.saleCant > 1 ? product.saleCant : ""} ${
                    product.product?.typeProduct
                  } ${product.product?.otherproductName}`
                : `- ${product.product?.brand} ${product.product?.model} 
    IMEI1:${product.product?.imei1}`}
              <Text
                style={{
                  color: colors.successColor,
                }}
              >{` +${product.totalValue * product.saleCant}$`}</Text>
            </Text>
          );
        })}

        <Text style={[styles.textColor, styles.itemText]}>
          Metodo de pago: {paymentType}
        </Text>
        <Text
          style={[
            styles.itemText,
            {
              color: colors.successColor,
            },
          ]}
        >
          Total: {data.sumTotalValue}$
        </Text>
        {removeBtn === true ? (
          ""
        ) : (
          <DescBtn
            data={data}
            setIsVisible={setIsVisible}
            setUpdateAfterDelete={setUpdateAfterDelete}
          />
        )}
      </View>
    </Modal>
  );
};

export default DescSale;

const styles = StyleSheet.create({
  container: {
    margin: 35,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    padding: 20,
  },
  textColor: {
    color: colors.fontColor,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
