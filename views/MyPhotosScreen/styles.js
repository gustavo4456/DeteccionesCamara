import { StyleSheet } from "react-native";

// Estilos para el modo claro (light)

export const lightStyles = StyleSheet.create({
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
    marginHorizontal: 4,
    alignItems: "center",
    padding: 3,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  textResult: {
    fontSize: 16,
    marginTop: 10,
    color: "#333", // Color de texto en modo claro
    textAlign: "center",
  },
  modalContainerIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
});

// Estilos para el modo oscuro (dark)
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#333", // Cambia el color de fondo en modo oscuro
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    marginHorizontal: 4,
    alignItems: "center",
    padding: 3,
    backgroundColor: "#222",
    borderRadius: 8,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#444", // Cambia el color de fondo del botón en modo oscuro
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  textResult: {
    fontSize: 16,
    marginTop: 10,
    color: "white", // Cambia el color de texto en modo oscuro
    textAlign: "center",
  },
  modalContainerIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semitransparente en blanco
  },
});
