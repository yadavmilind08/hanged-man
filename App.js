import { StyleSheet, View } from "react-native";
import { GameBoard } from "./src/screens/GameBoard";
import { Colors } from "./src/constants/color";

export default function App() {
  return (
    <View style={styles.container}>
      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
