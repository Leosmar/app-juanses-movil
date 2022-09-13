import React, { useContext} from "react";
import { Alert } from "react-native";
import { cleanSession } from "../helpers/userSession";
import { UserContext } from "../hooks/UserContext";


const LogOut = () => {
  const {setUserLogin } = useContext(UserContext);
  
  const close = async () => {
   await cleanSession();
   setUserLogin({status: null, rol: null});
  }
  
  close();

  return(<></>)
  
};

export default LogOut;
