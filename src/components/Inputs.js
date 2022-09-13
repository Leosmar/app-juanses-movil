import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import MultiSelect from "react-native-multiple-select";
import {
  AntDesign,
  Feather,
  Ionicons,
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
          borderColor: "#000",
          borderWidth: 1,
          padding: 5,
          color: "#fff",
        }}
      />
    </View>
  );
};

export const ModalMultiSelect = ({
  event,
  text,
  inputText,
  setInputText,
  items,
  isVisible,
  setIsVisible,
}) => {
  const [inputFilter, setInputFilter] = useState("");

  const ItemList = (item) => {
    let nameLoweCase = item.name.toLowerCase();
    let textLoweCase = inputFilter.toLowerCase();

    return (
      <>
        {nameLoweCase.indexOf(textLoweCase) != -1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#333",
              width: 500,
              padding: 10,
              marginVertical: 10,
            }}
            onPress={() => {
              event(item.id);
              setInputText(item.name);
              setIsVisible(false);
            }}
          >
            <Text
              style={{
                color: "#fff",
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
        style={[{ backgroundColor: "#363535", padding: 10 }]}
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
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />
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
              backgroundColor: "#202020",
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
                <AntDesign name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>

              <TextInput
                placeholder="Buscar"
                placeholderTextColor="#000"
                value={inputFilter}
                onChangeText={setInputFilter}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderWidth: 1,
                  padding: 5,
                  color: "#000",
                  width: "90%",
                  borderRadius: 5,
                }}
              />
            </View>
            <FlatList
              data={items}
              keyExtractor={(item) => JSON.stringify(item.id)}
              renderItem={(item) => ItemList(item.item)}
            />
          </View>
        </Modal>
      </TouchableOpacity>
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
