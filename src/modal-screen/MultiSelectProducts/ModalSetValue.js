import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import React from "react";
import colors from "../../helpers/colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
export const ModalSetValue = ({
  isInputVisible,
  setIsInputVisible,
  selectProducts,
  data,
  setValue,
  value,
  cant,
  addAndSubstractCant,
}) => {
  return (
    <Modal
      visible={isInputVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setIsInputVisible(false);
      }}
    >
      <TouchableOpacity
        onPress={() => setIsInputVisible(false)}
        style={{
          backgroundColor: "rgba(0,0,0, 0.1)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></TouchableOpacity>

      <View
        style={{
          backgroundColor: colors.mainColor,
          width: "100%",
          padding: 20,
          position: "absolute",
          bottom: 0,
          display: "flex",
          paddingBottom: 100,
        }}
      >
        <Text
          style={{
            color: colors.fontColor,
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Precio de venta de
          {data?.imei1
            ? ` ${data.brand} ${data.model}`
            : ` ${data.typeProduct} ${data.name}`}
        </Text>

        {!data.imei1 ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: -10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: colors.fontColor,
                fontSize: 20,
                paddingRight: 20,
              }}
            >
              cantidad
            </Text>
            <TouchableOpacity
              onPress={() => {
                addAndSubstractCant("subtract");
              }}
            >
              <AntDesign
                name="minuscircle"
                size={28}
                color={colors.fontColor}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colors.fontColor,
                fontSize: 25,
                paddingHorizontal: 10,
              }}
            >
              {cant}
            </Text>
            <TouchableOpacity
              onPress={() => {
                addAndSubstractCant("add", data.cant);
              }}
            >
              {data.cant === cant ? (
                <AntDesign
                  name="pluscircle"
                  size={28}
                  color={colors.errorColor}
                />
              ) : (
                <AntDesign
                  name="pluscircle"
                  size={28}
                  color={colors.fontColor}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder={`${value}$`}
            placeholderTextColor={colors.placeholderColor}
            value={value}
            onChangeText={setValue}
            style={{
              backgroundColor: "#fff",
              padding: 5,
              fontSize: 20,
              width: data?.imei1 ? "90%" : "75%",
              borderRadius: 5,
              marginRight: 5,
            }}
          />

          {!data?.imei1 ? (
            <View>
              <TouchableOpacity onPress={() => selectProducts("gift")}>
                <View
                  style={{
                    padding: 5,
                    marginHorizontal: 5,
                    backgroundColor: colors.submitButtonColor,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="gift"
                    size={30}
                    color={colors.fontColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}

          <TouchableOpacity onPress={selectProducts}>
            <View
              style={{
                padding: 5,
                backgroundColor: colors.successColor,
                borderRadius: 10,
              }}
            >
              <Ionicons name="md-send" size={28} color={colors.fontColor} />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.warnningColor,
            marginTop: 20,
          }}
        >
          Si no ingresa un precio de venta se tomara el que agrego al momento de
          registrar el producto
        </Text>
      </View>
    </Modal>
  );
};

export default ModalSetValue;
