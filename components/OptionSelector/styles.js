import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // flex: 1,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff", // Cambiar el color de fondo del elemento seleccionado
    padding: 10,
    borderRadius: 5, // Añadir bordes redondeados
  },
  selectedText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  modalContent: {
    width: 200, // Ajusta el ancho del contenido del modal
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    color: "#000", // Cambiar el color del texto de las opciones
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff", // Cambiar el color de fondo de las opciones
    borderBottomWidth: 1, // Añadir una línea divisoria entre las opciones
    borderColor: "#ccc", // Cambiar el color de la línea divisoria
  },
});
