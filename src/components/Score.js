import { StyleSheet, Text, View } from "react-native";

export const Score = ({ label, value }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "500",
  },
  valueContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
  },
});
