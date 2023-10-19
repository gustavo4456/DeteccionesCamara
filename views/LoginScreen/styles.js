// styles.js
import { StyleSheet } from "react-native";

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0", // Fondo gris claro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333", // Texto negro
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
    borderColor: "#DDDDDD", // Borde gris claro
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerRegister: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    color: "#333333", // Texto negro
  },
  error: {
    color: "#FF0000",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loading: {
    marginTop: 20,
  },
  registerLink: {
    alignSelf: "flex-start", // Alinea a la esquina superior izquierda
    margin: 10, // Margen entre el enlace y el campo de contraseña
  },
  registerText: {
    textDecorationLine: "underline",
    color: "#007BFF", // Color del enlace de registro
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Fondo oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF", // Texto blanco
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
    borderColor: "#333333", // Borde oscuro
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerRegister: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    color: "#FFFFFF", // Texto blanco
  },
  error: {
    color: "#FF0000",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loading: {
    marginTop: 20,
  },
  registerLink: {
    alignSelf: "flex-start",
    margin: 10,
  },
  registerText: {
    textDecorationLine: "underline",
    color: "#007BFF",
  },
});

export { lightStyles, darkStyles };
