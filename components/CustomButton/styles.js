import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  lightButton: {
    backgroundColor: "#61C0BF", // Color de fondo para el tema claro
  },
  darkButton: {
    backgroundColor: "#FF6347", // Color de fondo para el tema oscuro
  },
  buttonText: {
    color: "#FFF", // Color de texto por defecto
    fontSize: 16, // Tamaño de fuente
    fontWeight: "bold",
  },
  lightText: {
    color: "#000", // Color de texto para el tema claro
  },
  darkText: {
    color: "#FFF", // Color de texto para el tema oscuro
  },
});
