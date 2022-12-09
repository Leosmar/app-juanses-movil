import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { login } from "../api";
import Loader from "../components/Loader";
import { setSession, getSession } from "../helpers/userSession";
import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../helpers/colors";

const LoginScreen = () => {
  let placeholderColorText = "rgba(255,255,255, 0.6)";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getActiveSession = async () => {
    const data = await getSession();

    if (data === null) await setLoading(false);
  };

  useEffect(() => {
    getActiveSession();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    try {
      if (userName === "" || !password)
        return Alert.alert("Complete todos los campos");

      setLoading(true);

      const context = await login("login", { userName, password });

      if (context) {
        setUserLogin(context);
        await setSession(context);
      }

      setLoading(false);
    } catch (error) {
      console.log(`${error.status} ${error.statusText}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <StatusBar backgroundColor="#96B3FF"></StatusBar>

          <View style={circle.circleTopBlue}></View>

          <View style={circle.circleTopPink}></View>

          <View style={circle.circleBottonBlue}></View>

          <View style={circle.circleBottonPink}></View>

          <Image
            source={require("../../assets/images/jm-blanco-rosa.png")}
            style={styles.logo}
          />

          <View style={styles.containerBotton}>
            <View style={styles.inputImg}>
              <FontAwesome5 name="user" size={24} color={colors.fontColor} />
              <TextInput
                placeholder="Usuario"
                placeholderTextColor={placeholderColorText}
                style={styles.inputText}
                textContentType="nickname"
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            <View style={styles.inputImg}>
              <SimpleLineIcons name="lock" size={24} color={colors.fontColor} />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={placeholderColorText}
                style={styles.inputText}
                textContentType="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.text}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: colors.mainColor,
  },
  logo: {
    width: 230,
    height: 190,
    marginLeft: "35%",
    zIndex: 2,
  },
  containerBotton: {
    marginTop: "-30%",
  },
  inputImg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3.5,
    borderColor: "transparent",
    borderBottomColor: colors.fontColor,
    margin: 20,
    width: "70%",
  },
  imageLeft: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  inputText: {
    padding: 10,
    fontSize: 20,
    width: "80%",
    color: colors.fontColor,
  },
  text: {
    padding: 10,
    fontSize: 25,
    color: "#000",
    alignSelf: "center",
  },
  button: {
    borderWidth: 3,
    borderColor: "#FF686E",
    backgroundColor: "#FF969A",
    borderRadius: 10,
    margin: 20,
    width: 120,
  },
});

const circle = StyleSheet.create({
  circleTopBlue: {
    position: "absolute",
    top: -100,
    left: 0,
    width: 200,
    height: 200,
    backgroundColor: "#96B3FF",
    borderRadius: 200,
    zIndex: 1,
  },
  circleTopPink: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 200,
    height: 200,
    backgroundColor: "#FF969A",
    borderRadius: 200,
  },
  circleBottonBlue: {
    position: "absolute",
    bottom: 0,
    right: -100,
    width: 200,
    height: 200,
    backgroundColor: "#96B3FF",
    borderRadius: 200,
    zIndex: 1,
  },
  circleBottonPink: {
    position: "absolute",
    bottom: -100,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: "#FF969A",
    borderRadius: 200,
  },
});

export default LoginScreen;
