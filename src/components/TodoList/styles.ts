import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1F1E25",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginLeft: 8,
  },
  name: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },

  buttonText: {
    color: "#FDFCFE",
    fontSize: 24,
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    marginLeft: 16,
    color: colors.text,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
});
