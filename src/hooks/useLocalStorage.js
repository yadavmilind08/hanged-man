import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = (key, initialValue) => {
  const getItem = async () => {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue) {
      return storedValue;
    }
    return initialValue;
  };

  const setItem = (val) => {
    AsyncStorage.setItem(key, val.toString());
  };

  return [getItem, setItem];
};
