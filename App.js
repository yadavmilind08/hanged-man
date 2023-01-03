import { StyleSheet, View } from "react-native";
import { GameBoard } from "./src/screens/GameBoard";
import { Colors } from "./src/constants/color";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartGame } from "./src/screens/StartGame";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.white,
          }}
        >
          <Stack.Screen name="StartGame" component={StartGame} />
          <Stack.Screen name="GameBoard" component={GameBoard} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
