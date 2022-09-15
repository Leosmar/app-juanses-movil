import { useEffect } from "react";
import { Alert } from "react-native";

const staticPath = "192.168.100.96";
const defaulPath = "10.0.2.2";

const url =
  `http://${staticPath}:3000/api/` ||
  "https://api-juanses-movil-production.up.railway.app/api/";

export const login = async (endPoint, data) => {
  try {
    const res = await fetch(url + endPoint, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    const json = await res.json();

    if (json.error === "false") {
      return { status: true, rol: json.user.rol };
    } else {
      Alert.alert(`Error: ${json.message}`);
      return { status: null };
    }
  } catch (error) {
    Alert.alert(`Error ${error.status} ${error.statusText}`);
  }
};

export const register = async (endPoint, data, comment) => {
  try {
    let res = await fetch(url + endPoint, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    let json = await res.json();

    if (json.error === "false") {
      Alert.alert(`${comment} registrado correctamente`);
      return false;
    } else {
      Alert.alert(`Error: ${json.message}`);
      return true;
    }
  } catch (error) {
    console.log(`Error ${error.status} ${error.statusText}`);
    return true;
  }
};

export const update = async (endPoint, data, comment) => {
  try {
    let res = await fetch(url + endPoint, {
      method: "PUT",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    let json = await res.json();

    if (json.error === "false") {
      Alert.alert(`${comment} Actualizado correctamente`);
      return false;
    } else {
      Alert.alert(`Error: ${json.message}`);
      return true;
    }
  } catch (error) {
    console.log(`Error ${error.status} ${error.statusText}`);
    return true;
  }
};

export const getData = async (endPoint) => {
  try {
    let res = await fetch(url + endPoint);

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    let json = await res.json();
    if (json.error === "false") {

      if (json.data.length < 1) {
        return { isEmpity: true };
     
      } else {
        return json.data;
      }
    } else {
      Alert.alert(`Error: ${json.message}`);
      return json.error;
    }
  } catch (error) {
    console.log(`Error ${error.status} ${error.statusText}`);
    return 0;
  }
};

export const getDataById = async (endPoint, id) => {
  try {
    let res = await fetch(`${url}${endPoint}/${id}`);

    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    let json = await res.json();

    if (json.error === "false") {
      return json.data;
    } else {
      Alert.alert(`Error: ${json.message}`);
      return json.error;
    }
  } catch (error) {
    console.log(`Error ${error.status} ${error.statusText}`);
    return 0;
  }
};

export const deleteData = async (endPoint, id) => {
  try {
    let res = await fetch(`${url}${endPoint}/${id}`, { method: "DELETE" });
    if (!res.ok)
      throw {
        status: res.status,
        statusText: res.statusText,
      };

    let json = await res.json();

    if (json.error === "false") {
      return json.res;
    } else {
      Alert.alert(`Error: ${json.message}`);
      return json.error;
    }
  } catch (error) {
    console.log(`Error ${error.status} ${error.statusText}`);
    return 0;
  }
};
