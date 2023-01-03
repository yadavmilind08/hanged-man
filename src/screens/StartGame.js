import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { instructions } from "../constants/instruction";

export const StartGame = () => {
  const navigation = useNavigation();

  const onStartGame = () => {
    navigation.navigate("GameBoard");
  };

  return (
    <View style={styles.container}>
      <Header>Hanged Man</Header>
      <View style={styles.instructionSection}>
        <Text style={styles.label}>How to play?</Text>
        {instructions.map((instruction, index) => (
          <Text key={index} style={styles.instruction}>
            {index + 1}) {instruction}
          </Text>
        ))}
      </View>

      <View style={styles.button}>
        <Button onPress={onStartGame}>Start Game</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 20,
  },
  instructionSection: {
    marginVertical: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  instruction: {
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
  },
});
