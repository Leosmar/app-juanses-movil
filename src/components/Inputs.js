import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

import {
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../helpers/colors";

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
          backgroundColor: colors.secondColor,
          borderColor: "transparent",
          borderRadius: 5,
          borderWidth: 1,
          padding: 5,
          color: colors.fontColor,
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
          backgroundColor: colors.submitButtonColor,
          width: "50%",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={[{ textAlign: "center", color: colors.fontColor }]}>
          {textContent}
        </Text>
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
          backgroundColor: colors.errorColor,
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <AntDesign name="delete" size={24} color={colors.fontColor} />
      </TouchableOpacity>
    </View>
  );
};

export const ReturnBtn = ({ HandleEvent }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={HandleEvent}
        style={{
          backgroundColor: colors.warnningColor,
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <MaterialCommunityIcons
          name="cancel"
          size={24}
          color={colors.fontColor}
        />
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
          backgroundColor: colors.blueLigthColor,
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
      >
        <Feather name="edit-2" size={24} color={colors.fontColor} />
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
        <AntDesign name="arrowleft" size={30} color={colors.fontColor} />
      </TouchableOpacity>
    </View>
  );
};

export const AddButton = ({ HandleEvent }) => {
  return (
    <TouchableOpacity
      onPress={HandleEvent}
      style={[
        {
          padding: 10,
          position: "absolute",
          bottom: 30,
          right: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.blueLigthColor,
          width: 60,
          borderRadius: 5,
          zIndex: 1,
        },
      ]}
    >
      <Entypo name="add-to-list" size={30} color={colors.fontColor} />
    </TouchableOpacity>
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
