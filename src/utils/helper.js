import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
     const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Error", e.message);
    }
  };


export  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
        Alert.alert("Error", e.message);
    }
  };

