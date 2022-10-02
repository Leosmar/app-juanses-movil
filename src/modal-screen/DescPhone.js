import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";

import DescBtn from "../components/DescBtn";
import colors from "../helpers/colors";

const DesPhone = ({ isVisible, setIsVisible, data, setUpdateAfterDelete }) => {
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
          {data.brand} {data.model}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Pedido de: {data.nameProvider}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Codigo de pedido: {data.barCode}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Color: {data.color}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          IMEI 1: {data.imei1}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          IMEI 2: {data.imei2}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>RAM: {data.ram}</Text>
        <Text style={[styles.textColor, styles.itemText]}>
          RROM: {data.rom}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Valor total: {data.totalValue}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Precio de venta: {data.subjectValue}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Disponibilidad: {data.stock == true ? "Si" : "No"}
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

export default DesPhone;

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
