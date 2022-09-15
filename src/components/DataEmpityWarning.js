import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const DataEmpityWarning = ({ message, addRoute }) => {
  const navigation = useNavigation();

  return (
    <>
      <Text
        style={{
          color: "#CF2F2A",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(addRoute)}>
        <View>
          <Entypo name="add-to-list" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DataEmpityWarning;
