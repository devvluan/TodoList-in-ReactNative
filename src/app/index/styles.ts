import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 40,
    width: "100%",
  },
  title: {},
  toTitle: {
    fontSize: 32,
    color: colors.blue.light,
    fontWeight: "bold",
    marginLeft: 8,
  },
  doTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.purple.light,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  input: {
    flex: 1,
    height: 54,
    backgroundColor: colors.gray[500],
    borderRadius: 6,
    color: colors.text,
    padding: 16,
    fontSize: 16,
    marginRight: 4,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: colors.blue.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  statBadge: {
    backgroundColor: colors.gray[400],
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statValue: {
    color: colors.gray[200],
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray[400],
    paddingTop: 48,
    marginTop: 20,
  },
  emptyTextBold: {
    color: colors.gray[300],
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptyText: {
    color: colors.gray[300],
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
