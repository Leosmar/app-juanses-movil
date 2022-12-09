import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import DescBtn from "../components/DescBtn";
import { getData } from "../api";
import colors from "../helpers/colors";
import { Table, Rows, Row } from "react-native-table-component";

const DescBuyProduct = ({
  isVisible,
  setIsVisible,
  data,
  setUpdateAfterDelete,
}) => {
  const [phoneRegister, setPhoneRegister] = useState();
  const [showTable, setshowTable] = useState(false);

  const getPhonesRegister = async () => {
    const res = await getData("get-buy-product-phone-register");
    if (res?.isEmpity !== true) {
      const filterData = res.filter((item) => item.id === data.id);

      const dataPhone = filterData.map((item) => {
        return {
          id: item.imei1,
          brand: item.brand,
          model: item.model,
          imei1: item.imei1,
          imei2: item.imei2,
          totalValue: item.totalValue,
        };
      });
      return setPhoneRegister(dataPhone);
    }

    if (res?.isEmpity === true) {
      return setPhoneRegister(res);
    }
  };

  useEffect(() => {
    if (isVisible === true) {
      getPhonesRegister();
    }
  }, [isVisible]);
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setIsVisible(!isVisible);
        setshowTable(false);
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
          setshowTable(false);
        }}
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
          {data.providerName} {data.categoryTypeProduct}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Codigo de entrega: {data.barCode}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Cantidad de articulos: {data.cant}
        </Text>
        <Text
          style={[
            {
              color:
                phoneRegister?.length < data.cant
                  ? colors.warnningColor
                  : colors.successColor,
            },
            styles.itemText,
          ]}
        >
          Cantidad de articulos registrados: {phoneRegister?.length}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Valor Total: {data.totalValue}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Abono: {data.paid}$
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Comentario: {data.comment}
        </Text>

        <TouchableOpacity onPress={() => setshowTable(!showTable)}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 16,
              marginBottom: 15,
              color: showTable ? colors.warnningColor : colors.blueLigthColor,
            }}
          >
            {showTable
              ? "Ocultar productos registrados"
              : "Mostrar productos registrados"}
          </Text>
        </TouchableOpacity>

        {phoneRegister && showTable && (
          <Table
            borderStyle={{
              borderWidth: 2,
              borderColor: colors.blueLigthColor,
            }}
            style={{
              backgroundColor: colors.secondColor,
              marginBottom: 15,
            }}
          >
            <Row
              data={["Marca", "Modelo", "Imei1", "Valor ($)"]}
              textStyle={styles.text}
              style={{
                height: 40,
                backgroundColor: colors.mainColor,
              }}
            />

            <Rows
              data={
                phoneRegister &&
                phoneRegister.map((item) => {
                  return [item.brand, item.model, item.imei1, item.totalValue];
                })
              }
              textStyle={{
                color: colors.fontColor,
                textAlign: "center",
              }}
              style={{
                minHeight: 40,
              }}
            />
          </Table>
        )}

        {/* data={[
                      [item.item.brand],
                      [item.item.model],
                      [item.item.imei1],
                      [item.item.totalValue],
                    ]} */}
        <DescBtn
          data={data}
          setIsVisible={setIsVisible}
          setUpdateAfterDelete={setUpdateAfterDelete}
        />
      </View>
    </Modal>
  );
};

export default DescBuyProduct;

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
  text: {
    color: colors.fontColor,
    textAlign: "center",
    margin: 6,
  },
});
