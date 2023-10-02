import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    marginRight: 8, // Agregar margen derecho para separar las celdas
  },
});
