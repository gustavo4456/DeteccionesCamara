import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007bff", // Cambia el color de fondo del botón
    color: "#fff", // Cambia el color del texto del botón
    fontSize: 18, // Cambia el tamaño del texto del botón
    paddingVertical: 12, // Ajusta el espacio vertical en el botón
    borderRadius: 8, // Añade bordes redondeados al botón
  },
  successMessage: {
    marginTop: 10, // Espacio desde la parte superior del botón de guardar
    color: "green", // Color del mensaje de éxito (puedes cambiar a "red" para mensajes de fallo)
    fontSize: 16, // Tamaño de fuente del mensaje
    textAlign: "center", // Alineación del texto al centro
  },
  errorMessage: {
    marginTop: 10, // Espacio desde la parte superior del botón de guardar
    color: "red", // Color del mensaje de éxito (puedes cambiar a "red" para mensajes de fallo)
    fontSize: 16, // Tamaño de fuente del mensaje
    textAlign: "center", // Alineación del texto al centro
  },
});
