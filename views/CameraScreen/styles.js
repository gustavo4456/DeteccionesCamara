import { StyleSheet } from "react-native";

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Cambia el color de fondo en el modo claro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000", // Cambia el color del texto en el modo claro
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    color: "#333", // Cambia el color del texto explicativo en el modo claro
  },
  buttonText: {
    color: "white",
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 16,
    backgroundColor: "#333", // Cambia el color de fondo en el modo oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff", // Cambia el color del texto en el modo oscuro
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    color: "#ccc", // Cambia el color del texto explicativo en el modo oscuro
  },
  buttonText: {
    color: "white",
  },
});
