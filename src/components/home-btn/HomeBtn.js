import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../helpers/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const HomeBtn = ({
  iconName,
  size = 26,
  content,
  screenRoute,
  controlForm,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenRoute)}
      onLongPress={() =>
        navigation.navigate(controlForm.route, {
          screen: controlForm.screen,
        })
      }
      style={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        styles.container,
      ]}
    >
      <AntDesign name={iconName} size={size} color={colors.fontColor} />
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

export default HomeBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondColor,
    width: "25%",
    maxHeight: 80,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: colors.fontColor,
  },
});
