import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { getData } from "../api";
import Title from "../components/Title";
import Layout from "../components/Layout";
import { AddButton, BackButton } from "../components/Inputs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchModal from "../modal-screen/SearchModal";
import colors from "../helpers/colors";

const ContainerSubRoutes = ({
  getRoute,
  controlForm,
  title,
  ListItem,
  updateAfterDelete,
  search,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [inputFilter, setInputFilter] = useState("");

  const getApiData = async () => {
    const res = await getData(getRoute);
    return setData(res);
  };

  useEffect(() => {
    if (isFocused === true) {
      getApiData();
      setInputFilter("");
    }
  }, [isFocused]);

  useEffect(() => {
    if (updateAfterDelete !== true) {
      setData([]);
      setInputFilter("");
      getApiData();
    }
  }, [updateAfterDelete]);

  const renderItem = (item) => {
    let searchLoweCase = "";

    if (search === "providerId") {
      searchLoweCase = JSON.stringify(item?.provider?.name || "").toLowerCase();
    } else {
      searchLoweCase = JSON.stringify(item[search] || "").toLowerCase();
    }

    let textLoweCase = inputFilter.toLowerCase();
    return (
      <>
        {searchLoweCase.indexOf(textLoweCase) != -1 ? (
          <View style={styles.itemContainer}>
            <ListItem item={item}>
              <Entypo name="dots-three-horizontal" size={24} color={colors.fontColor} />
            </ListItem>
          </View>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <Layout displayNone={true}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BackButton HandleEvent={() => navigation.goBack()} />
          <Title>{title}</Title>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => setIsVisible(true)}
          >
            <Ionicons name="search" size={28} color={colors.fontColor} />
            <SearchModal
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              inputFilter={inputFilter}
              setInputFilter={setInputFilter}
            />
          </TouchableOpacity>

          <AddButton
            HandleEvent={() =>
              navigation.navigate(controlForm.route, {
                screen: controlForm.screen,
                params:
                  controlForm.putApi || controlForm.postApi
                    ? { controlForm }
                    : undefined,
              })
            }
          />
          
        </View>
      </View>

      {data.length > 0 ? (
        <FlatList
          keyExtractor={(item) => JSON.stringify(item.id)}
          data={data}
          renderItem={(item) => renderItem(item.item)}
        />
      ) : data?.isEmpity === true ? (
        <Text
          style={{
            color: "#CF2F2A",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          No se han encontrado registros
        </Text>
      ) : (
        <ActivityIndicator color={colors.fontColor} size="large" />
      )}
    </Layout>
  );
};

export default ContainerSubRoutes;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: colors.secondColor,
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 5,
  },
});
