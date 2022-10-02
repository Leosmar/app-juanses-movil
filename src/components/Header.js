import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import LogOut from "./LogOut";
import { MaterialIcons } from '@expo/vector-icons'; 
import colors from "../helpers/colors";


const Header = () => {

    const [btn, setBtn] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/jm-blanco-rosa-50.png")}
      />


      <TouchableOpacity onPress={() => setBtn(true)}>
      <MaterialIcons name="logout" size={30} color={colors.errorColor} />
      </TouchableOpacity>

      {btn === true ? <LogOut/>: ""}

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    padding: 10,
  },
  logo: {
    width: 50,
    height: 37,
  },
});
