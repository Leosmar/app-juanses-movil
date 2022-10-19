import { Alert } from "react-native";

const url =
  "http://192.168.100.96:3000/api/" ||
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
      Alert.alert(`${comment} actualizado correctamente`);
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
      Alert.alert(`Error: ${json.message || json.err.name}`);
      return json.error;
    }
  } catch (error) {
    console.log(`Error ${error.err.name} ${error.statusText}`);
    return;
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
    return;
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
