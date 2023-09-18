import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
    padding: 2,
  },
  image: {
    width: 177,
    height: 177,
    resizeMode: "cover",
    marginBottom: 2,
    borderRadius: 8,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 16,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row", // Alinear los botones horizontalmente
    justifyContent: "space-between", // Espacio uniforme entre los botones
  },
  shareButton: {
    flex: 1, // Ocupar el espacio disponible igualmente
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8, // Espaciado entre los botones
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
