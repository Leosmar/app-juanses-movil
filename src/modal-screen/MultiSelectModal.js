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
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DataEmpityWarning from "../components/DataEmpityWarning";
import colors from "../helpers/colors";

const MultiSelectModal = ({
  event,
  text,
  inputText,
  setInputText,
  items,
  isVisible,
  setIsVisible,
  ifItemEmpity,
}) => {
  const [inputFilter, setInputFilter] = useState("");

  const ItemList = (item) => {
    let nameLoweCase = item?.name.toLowerCase();
    let textLoweCase = inputFilter.toLowerCase();
    return (
      <>
        {nameLoweCase.indexOf(textLoweCase) != -1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondColor,
              width: 500,
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              event(item.id);
              setInputText(item.name);
              setIsVisible(false);
            }}
          >
            <Text
              style={{
                color: colors.fontColor,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{text}</Text>
      <TouchableOpacity
        style={[{ backgroundColor: colors.secondColor, padding: 8, borderRadius: 5 }]}
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
          <Text style={styles.inputLabel}>{inputText}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.fontColor} />
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
                <AntDesign name="arrowleft" size={30} color={colors.fontColor} />
              </TouchableOpacity>

              <TextInput
                placeholder="Buscar"
                placeholderTextColor="#000"
                value={inputFilter}
                onChangeText={setInputFilter}
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
                keyExtractor={(item) => JSON.stringify(item.id)}
                renderItem={(item) => ItemList(item.item)}
              />
            ) : items?.isEmpity === true ? (
              <DataEmpityWarning
                message={`No hay ningun ${ifItemEmpity?.text} registrado`}
                addRoute={ifItemEmpity?.addRoute}
              />
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

export default MultiSelectModal;
