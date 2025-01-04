import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: colors.itemBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.text,
  },
  input: {
    height: 100,
    width: "100%",
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 60,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: colors.danger,
  },
  buttonSave: {
    backgroundColor: colors.blue.light,
  },
});
