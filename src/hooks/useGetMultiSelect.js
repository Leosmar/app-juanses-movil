import { useState, useEffect } from "react";
import { GetItemMultiSelect } from "../helpers/getItemMultiSelect";
import { useIsFocused } from "@react-navigation/native";

export const useGetMultiSelect = (url, dbColumn, defaultMultiSelectData) => {
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);
  const [inputText, setInputText] = useState("");
  const [id, setId] = useState("");

  const getDataMultiSelect = async () => {
    setMultiSelect(await GetItemMultiSelect(url, dbColumn));
  };

  useEffect(() => {
    if (isFocused === true) {
      if (url === "" && defaultMultiSelectData) {
        setMultiSelect(defaultMultiSelectData);
      } else {
        getDataMultiSelect();
      }
      setIsVisible(false);
    }
  }, [isFocused]);

  return {
    isVisible,
    setIsVisible,
    multiSelect,
    setMultiSelect,
    inputText,
    setInputText,
    id,
    setId,
  };
};
