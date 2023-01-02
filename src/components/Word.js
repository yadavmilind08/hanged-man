import { StyleSheet, Text, View } from "react-native";

export const Word = ({ wordLetters, triedLetters }) => {
  return (
    <View style={styles.wordSection}>
      {wordLetters.map((w, index) => (
        <View key={index}>
          <Text style={styles.letter}>
            {triedLetters.includes(w) ? w : "_"}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wordSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  letter: {
    marginRight: 10,
    fontSize: 24,
    fontWeight: "400",
  },
});
