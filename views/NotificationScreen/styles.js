import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notificationItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },

  notificationDate: {
    fontSize: 12,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 16,
  },

  notificationMessageRead: {
    fontSize: 16,
    marginBottom: 8,
    // color: "lightgray", // Color de texto para notificaciones leídas
  },
  notificationMessageUnread: {
    fontSize: 16,
    marginBottom: 8,
    color: "black", // Color de texto para notificaciones no leídas
    fontWeight: "bold",
  },
  notificationContent: {
    flexDirection: "row", // Coloca los elementos en una fila horizontal
    alignItems: "center", // Alinea los elementos verticalmente en el centro
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationIcon: {
    marginRight: 8, // Añade un margen a la derecha del icono
  },

  textContainer: {
    flexDirection: "column", // Coloca los elementos en una columna vertical
    alignItems: "flex-start", // Alinea los elementos a la izquierda
    marginLeft: 16, // Agrega un margen a la izquierda para separarlos de los iconos
    flex: 1, // Para que el texto y la fecha ocupen todo el espacio disponible
  },
});
