import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
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
    borderRadius: 80, // Esto hace que la imagen tenga forma circular
    marginVertical: 10,
  },
});
