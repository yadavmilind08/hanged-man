import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/color";

export const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary100,
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    position: "absolute",
    bottom: 40,
    width: "90%",
  },
});
