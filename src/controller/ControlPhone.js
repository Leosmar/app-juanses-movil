import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { register, update } from "../api";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { Input, SubmitButton, BackButton } from "../components/Inputs";
import MultiSelectModal from "../modal-screen/MultiSelectModal";
import Title from "../components/Title";
import { useGetMultiSelect } from "../hooks/useGetMultiSelect";

const ControlPhone = ({ route }) => {
  const params = route.params || null;

  const navigation = useNavigation();
  const [loader, setloader] = useState(false);

  const [id, setId] = useState("");
  const buyProduct = useGetMultiSelect("get-buy-product-phone", {
    item1: "provider",
    subItem1: "name",
    item2: "barCode",
  });
  const brand = useGetMultiSelect("get-brand", "brand");
  const model = useGetMultiSelect("get-model", "model");
  const [color, setColor] = useState("");
  const [imei1, setImei1] = useState("");
  const [imei2, setImei2] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [stock, setStock] = useState("");
  const [isVisibleStock, setIsVisibleStock] = useState(false);
  const [stockMultiSelect, setStockMultiSelect] = useState("");

  useEffect(() => {
    if (params) {
      setId(params.id);
      buyProduct.setId(params.buyProductId);
      brand.setId(params.brandId);
      model.setId(params.modelId);
      setColor(params.color);
      setImei1(JSON.stringify(params.imei1));
      setImei2(JSON.stringify(params.imei2));
      setRam(JSON.stringify(params.ram));
      setRom(JSON.stringify(params.rom));
      setTotalValue(JSON.stringify(params.totalValue));
      setSubjectValue(JSON.stringify(params.subjectValue));
      setStock(JSON.stringify(params.stock));
      buyProduct.setInputText(`${params.nameProvider} #${params.barCode}`);
      brand.setInputText(params.brand);
      model.setInputText(params.model);
      setStockMultiSelect(params.stock === 1? "Si": "No");
      setloader(false);
    }
  }, [params]);

  const handleSubmit = async () => {
    if (!buyProduct.id || !brand.id || !model.id)
      return Alert.alert("Complete el campo obligatorio");

    setloader(true);

    if (!params) {
      const res = await register(
        "post-phone",
        {
          buyProductId: buyProduct.id,
          brandId: brand.id,
          modelId: model.id,
          color,
          imei1,
          imei2,
          ram,
          rom,
          totalValue,
          subjectValue,
        },
        "Telefono"
      );
      res && setloader(false);
      navigation.goBack();
    }

    if (params) {
      const res = await update(
        "put-phone",
        {
          id,
          buyProductId: buyProduct.id,
          brandId: brand.id,
          modelId: model.id,
          color,
          imei1,
          imei2,
          ram,
          rom,
          totalValue,
          subjectValue,
          stock: stock === 1 ? "true" : "false",
        },
        "Telefono"
      );

      res && setloader(false);
      navigation.goBack();
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <Layout displayNone={true}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BackButton HandleEvent={() => navigation.goBack()} />
          <Title>{params ? "Editar" : "Registrar"} telefono</Title>
        </View>
        <MultiSelectModal
          isVisible={buyProduct.isVisible}
          setIsVisible={buyProduct.setIsVisible}
          event={buyProduct.setId}
          items={buyProduct.multiSelect}
          text="Pedido *"
          inputText={buyProduct.inputText}
          setInputText={buyProduct.setInputText}
          ifItemEmpity={{
            text: "Pedido",
            addRoute: "Control-buy-product",
          }}
        />

        <MultiSelectModal
          isVisible={brand.isVisible}
          setIsVisible={brand.setIsVisible}
          event={brand.setId}
          items={brand.multiSelect}
          text="Marca *"
          inputText={brand.inputText}
          setInputText={brand.setInputText}
          ifItemEmpity={{
            text: "Marca",
            addRoute: "Control-brand",
          }}
        />

        <MultiSelectModal
          isVisible={model.isVisible}
          setIsVisible={model.setIsVisible}
          event={model.setId}
          items={model.multiSelect}
          text="Modelo *"
          inputText={model.inputText}
          setInputText={model.setInputText}
          ifItemEmpity={{
            text: "Modelo",
            addRoute: "Control-model",
          }}
        />

        <Input
          data={color}
          event={setColor}
          contentType="text"
          keyboardType="text"
          text="Color"
        />

        <Input
          data={imei1}
          event={setImei1}
          contentType="number"
          keyboardType="numeric"
          text="Imei 1"
        />

        <Input
          data={imei2}
          event={setImei2}
          contentType="number"
          keyboardType="numeric"
          text="Imei 2"
        />

        <Input
          data={ram}
          event={setRam}
          contentType="number"
          keyboardType="numeric"
          text="Ram"
        />

        <Input
          data={rom}
          event={setRom}
          contentType="number"
          keyboardType="numeric"
          text="Almacenamiento"
        />

        <Input
          data={totalValue}
          event={setTotalValue}
          contentType="number"
          keyboardType="numeric"
          text="Valor de compra"
        />

        <Input
          data={subjectValue}
          event={setSubjectValue}
          contentType="number"
          keyboardType="numeric"
          text="Valor sugerido de venta"
        />

        {stock && (
          <MultiSelectModal
            isVisible={isVisibleStock}
            setIsVisible={setIsVisibleStock}
            event={setStock}
            items={[
              { id: 1, name: "Si" },
              { id: 2, name: "No" },
            ]}
            text="Disponibiliad"
            inputText={stockMultiSelect}
            setInputText={setStockMultiSelect}
            ifItemEmpity={{
              text: "Disponibilidad",
              addRoute: "Inventory",
            }}
          />
        )}

        <SubmitButton
          textContent={params ? "Editar" : "Registrar"}
          HandleEvent={handleSubmit}
        />
      </ScrollView>
    </Layout>
  );
};

export default ControlPhone;

const styles = StyleSheet.create({});
