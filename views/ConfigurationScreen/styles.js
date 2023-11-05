import { StyleSheet } from "react-native";
// Estilos para el modo claro (light)

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF", // Color de fondo en el modo claro
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000", // Color del texto en el modo claro
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007bff", // Cambia el color de fondo del botón en el modo claro
    color: "#fff", // Cambia el color del texto del botón en el modo claro
    fontSize: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  successMessage: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  settingText: {
    color: "#000000", // Color del texto de configuración en el modo claro
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
});

// Estilos para el modo oscuro (dark)
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#333", // Color de fondo en el modo oscuro
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FFFFFF", // Color del texto en el modo oscuro
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#242424", // Cambia el color de fondo del botón en el modo oscuro
    color: "#fff", // Cambia el color del texto del botón en el modo oscuro
    fontSize: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  successMessage: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  settingText: {
    color: "#FFFFFF", // Color del texto de configuración en el modo oscuro
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semitransparente en blanco
  },
});
