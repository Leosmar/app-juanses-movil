import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import {
  AntDesign,
  Feather,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

export const Input = ({
  text,
  contentType,
  data,
  event,
  keyboardType,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{text}</Text>
      <TextInput
        placeholder={placeholder}
        value={data}
        onChangeText={event}
        secureTextEntry={contentType === "password" ? true : false}
        keyboardType={keyboardType}
        style={{
          backgroundColor: "#363535",
          borderColor: "transparent",
          borderRadius: 5,
          borderWidth: 1,
          padding: 5,
          color: "#fff",
        }}
      />
    </View>
  );
};


export const SubmitButton = ({ textContent, HandleEvent }) => {
  return (
    <View
      style={{
        marginLeft: 30,
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        onPress={HandleEvent}
        style={{
          backgroundColor: "#FF686E",
          width: "50%",
          padding: 10,
        }}
      >
        <Text style={[{ textAlign: "center" }]}>{textContent}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const DeleteButton = ({ HandleEvent }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={HandleEvent}
        style={{
          backgroundColor: "#CF2F2A",
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <AntDesign name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export const UpdateButton = ({ HandleEvent }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={HandleEvent}
        style={{
          backgroundColor: "#96B3FF",
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <Feather name="edit-2" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export const BackButton = ({ HandleEvent }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={HandleEvent}
        style={{ padding: 10, marginHorizontal: 5 }}
      >
        <AntDesign name="arrowleft" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export const AddButton = ({ HandleEvent }) => {
  return (
    <View>
      <TouchableOpacity onPress={HandleEvent} style={{ padding: 10 }}>
        <Entypo name="add-to-list" size={30} color="#fff" />
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
    color: "#fff",
  },
});
