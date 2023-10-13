import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  lightButton: {
    backgroundColor: "#61C0BF", // Color de fondo para el tema claro
  },
  darkButton: {
    backgroundColor: "#FF6347", // Color de fondo para el tema oscuro
  },
  buttonText: {
    color: "#FFF", // Color de texto por defecto
  },
  lightText: {
    color: "#000", // Color de texto para el tema claro
  },
  darkText: {
    color: "#FFF", // Color de texto para el tema oscuro
  },
});
