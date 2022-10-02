import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Octicons } from "@expo/vector-icons";
import colors from "../../helpers/colors";

const EachBtn = ({
  isVisible,
  setIsVisible,
  text,
  color,
  screenRoute,
  controlForm,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerBtn}>
      <View
        style={{
          width: "100%",
          display: isVisible,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          bottom: 60,
        }}
      >
        <TouchableOpacity
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate(controlForm.route, {
              screen: controlForm.screen,
            });
          }}
        >
          <Entypo name="add-to-list" size={30} color={colors.fontColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate(screenRoute);
          }}
        >
          <Octicons name="eye" size={30} color={colors.fontColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: color }]}
        onPress={() => setIsVisible(isVisible === "none" ? "flex" : "none")}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EachBtn;

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    width: "100%",
    borderRadius: 5,
  },
  text: {
    color: colors.fontColor,
    textAlign: "center",
    fontSize: 16,
  },
  containerBtn: {
    width: "35%",
  },
});
