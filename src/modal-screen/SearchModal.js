import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SearchModal = ({
  isVisible,
  setIsVisible,
  inputFilter,
  setInputFilter,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableOpacity
        onPress={() => setIsVisible(false)}
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

      <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <TextInput
          autoFocus={true}
          placeholder="Buscar"
          value={inputFilter}
          onChangeText={setInputFilter}
          style={{
            backgroundColor: "#ccc",
            padding: 10,
            width: "80%",
            borderRadius: 5,
            marginTop: 10,
          }}
        />
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({});
