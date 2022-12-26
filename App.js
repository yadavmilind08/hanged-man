import { StyleSheet, View } from "react-native";
import { GameBoard } from "./screens/GameBoard";
import { Colors } from "./constants/color";

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
