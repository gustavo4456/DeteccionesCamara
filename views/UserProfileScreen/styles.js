import { StyleSheet } from "react-native";

// Estilos para el tema claro

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerError: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputIcon: {
    padding: 10,
    color: "#007BFF",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
});

// Estilos para el tema oscuro
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333", // Cambia el fondo a un tono oscuro
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white", // Cambia el color del texto a blanco
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderColor: "#555", // Cambia el color del borde
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerError: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputIcon: {
    padding: 10,
    color: "#007BFF",
  },
  input: {
    flex: 1,
    padding: 10,
    color: "white", // Cambia el color del texto de entrada a blanco
  },
  inputError: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semitransparente en blanco
  },
});
