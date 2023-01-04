import { StyleSheet, Text, View } from "react-native";

export const Word = ({ letters }) => {
  return (
    <View style={styles.wordSection}>
      {letters.map((letter, index) => (
        <View key={index}>
          <Text style={styles.letter}>
            {letter.isMatched ? letter.value : "_"}
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
