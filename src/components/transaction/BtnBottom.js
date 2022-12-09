import { View } from "react-native";
import React, { useEffect } from "react";
import colors from "../../helpers/colors";
import { useBtnIsVisible } from "../../hooks/useBtnIsVisible";
import EachBtn from "./EachBtn";
import { useIsFocused } from "@react-navigation/native";

const BtnBottom = () => {
  const isFocused = useIsFocused();
  const sale = useBtnIsVisible();
  const spent = useBtnIsVisible();

  useEffect(() => {
    if (isFocused === false) {
      sale.setIsVisible("none");
      spent.setIsVisible("none");
    }
  }, [isFocused]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
      }}
    >
      <EachBtn
        isVisible={sale.isVisible}
        setIsVisible={sale.setIsVisible}
        color={colors.successColor}
        screenRoute="Sale"
        controlForm={{
          route: "Control-form",
          screen: "Control-sale",
        }}
        text="Venta"
      />

      <EachBtn
        isVisible={spent.isVisible}
        setIsVisible={spent.setIsVisible}
        color={colors.errorColor}
        text="Gasto"
        screenRoute="Spent"
        controlForm={{
          route: "Control-form",
          screen: "Control-spent",
        }}
      />
    </View>
  );
};

export default BtnBottom;
