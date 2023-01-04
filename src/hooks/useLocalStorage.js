import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue) {
      setValue(storedValue);
    }
  };

  const setItem = (val) => {
    AsyncStorage.setItem(key, val.toString());
    setValue(val);
  };

  return [value, setItem];
};
