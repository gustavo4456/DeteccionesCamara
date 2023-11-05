import { StyleSheet } from "react-native";

// Estilos para el tema claro
export const lightStyles = StyleSheet.create({
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
  },
  notificationMessageUnread: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 8,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 16,
    flex: 1,
  },
  inactiveNotificationsMessage: {
    fontSize: 18,
    color: "#555", // Color de texto para el modo claro
    textAlign: "center",
  },
});

// Estilos para el tema oscuro
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#333", // Cambiar el color de fondo en el tema oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white", // Cambiar el color del título en el tema oscuro
  },
  notificationItem: {
    backgroundColor: "#444", // Cambiar el color de fondo en el tema oscuro
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
    backgroundColor: "#222", // Cambiar el color de fondo en el tema oscuro
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 16,
    color: "white", // Cambiar el color del mensaje en el tema oscuro
  },
  notificationMessageRead: {
    fontSize: 16,
    marginBottom: 8,
    color: "lightgray", // Cambiar el color de texto para notificaciones leídas
  },
  notificationMessageUnread: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "lightgray", // Cambiar el color de texto para notificaciones no leídas
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 8,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 16,
    flex: 1,
  },
  inactiveNotificationsMessage: {
    fontSize: 18,
    color: "#BBB", // Color de texto para el modo oscuro
    textAlign: "center",
  },
});
