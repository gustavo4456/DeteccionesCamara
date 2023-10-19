import { StyleSheet } from "react-native";

// Estilos para el modo claro (light)
export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff", // Color de fondo en el modo claro
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
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
    marginRight: 8,
    color: "black",
  },
  selectedRow: {
    backgroundColor: "lightblue", // Color de fondo para fila seleccionada en modo claro
  },
  deleteSelectedButton: {
    backgroundColor: "red", // Color de fondo para el botón de eliminar seleccionados en modo claro
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  deleteSelectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

// Estilos para el modo oscuro (dark)
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#333", // Cambia el color de fondo en modo oscuro
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#444", // Cambia el color de fondo del encabezado en modo oscuro
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#666", // Cambia el color de borde en modo oscuro
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff", // Cambia el color del texto en modo oscuro
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
  },
  cell: {
    flex: 1,
    marginRight: 8,
    color: "white",
  },
  selectedRow: {
    backgroundColor: "darkblue", // Cambia el color de fondo para fila seleccionada en modo oscuro
  },
  deleteSelectedButton: {
    backgroundColor: "maroon", // Cambia el color de fondo para el botón de eliminar seleccionados en modo oscuro
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  deleteSelectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
