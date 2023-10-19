import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    margin: 20,
  },
  buttonCloseContainer: {
    position: "absolute", // Colocar el botón en una posición absoluta
    top: 20, // Alinear el botón en la parte superior
    right: 20, // Alinear el botón en la esquina derecha
    backgroundColor: "transparent",
  },

  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    margin: 2,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  permissionText: {
    textAlign: "center",
    fontSize: 16,
  },
  permissionButton: {
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: "#000",
  },
  modalImage: {
    width: 300,
    height: 300,
  },

  sendButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  resultText: {
    color:"white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  errorText: {
    color: "red", // Color del texto en rojo, puedes cambiarlo si lo deseas
    fontSize: 16, // Tamaño de fuente, ajusta según tus preferencias
    marginTop: 10, // Espacio superior para separar del contenido anterior
    textAlign: "center", // Alineación del texto al centro
    fontWeight: "bold", // Puedes ajustar el grosor del texto
  },
});
