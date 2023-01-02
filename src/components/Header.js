import { StyleSheet, Text, View } from "react-native";

export const Header = ({ children }) => {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.appLabel}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    alignItems: "center",
  },
  appLabel: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
