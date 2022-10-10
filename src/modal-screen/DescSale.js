import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import DescBtn from "../components/DescBtn";
import colors from "../helpers/colors";

const DescSpent = ({ isVisible, setIsVisible, data, setUpdateAfterDelete }) => {
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
          {data.product?.typeProduct
            ? `${data.product?.typeProduct} ${data.product?.otherproductName}`
            : `${data.product?.brand} ${data.product?.model}`}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Cliente: {data.name}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Total: {data.totalValue}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Metodo de pago: {data.paymentType}
        </Text>
        <DescBtn
          data={data}
          setIsVisible={setIsVisible}
          setUpdateAfterDelete={setUpdateAfterDelete}
        />
      </View>
    </Modal>
  );
};

export default DescSpent;

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
