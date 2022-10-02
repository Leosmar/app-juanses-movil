import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import DescBtn from "../components/DescBtn";
import { getData } from "../api";
import colors from "../helpers/colors";
const DescBuyProduct = ({
  isVisible,
  setIsVisible,
  data,
  setUpdateAfterDelete,
}) => {
  const [phoneRegister, setPhoneRegister] = useState();

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
          {data.providerName} {data.categoryTypeProduct}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Codigo de entrega: {data.barCode}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Cantidad de articulos: {data.cant}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Valor Total: {data.totalValue}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Abono: {data.paid}
        </Text>
        <Text style={[styles.textColor, styles.itemText]}>
          Comentario: {data.comment}
        </Text>
        <DescBtn
          data={data}
          setIsVisible={setIsVisible}
          setUpdateAfterDelete={setUpdateAfterDelete}
        />

        {phoneRegister && (
          <FlatList
            data={phoneRegister}
            keyExtractor={(item) => JSON.stringify(item.id)}
            renderItem={(item) => {
              return (
                <>
                  <Text style={[styles.textColor, styles.itemText]}>
                    {item.item.brand} {item.item.model}
                  </Text>
                  <Text style={[styles.textColor, styles.itemText]}>
                    {item.item.imei1} {item.item.imei2}
                  </Text>
                </>
              );
            }}
          />
        )}
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
});
