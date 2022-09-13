import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSession = async (value) => {
  await AsyncStorage.setItem("user_session", JSON.stringify(value));

  const data = await AsyncStorage.getItem("user_session");
};

export const getSession = async () => {
  const value = await AsyncStorage.getItem("user_session");

  return JSON.parse(value);
};

export const cleanSession = async () => {
  await AsyncStorage.removeItem("user_session");
};
