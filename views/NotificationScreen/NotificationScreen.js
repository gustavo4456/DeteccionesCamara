import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../contexts/GlobalContext";


import styles from "./styles";

import * as SecureStore from "expo-secure-store";
import apiUrl from "../../api/apiUrls";

const formatDate = (dateStr) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Date(dateStr).toLocaleString(undefined, options);
};

const NotificationScreen = () => {
  const { notifications, setNotifications } = useGlobalContext([]);
  const [selectedNotification, setSelectedNotification] = useState(null); // Estado para el mensaje completo
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const isFocused = useIsFocused();


  const handleNotificationPress = async (
    notification,
    idNotification,
    isRead
  ) => {
    setSelectedNotification(notification);
    setIsModalVisible(true); // Abrir el modal al hacer clic en una notificación

    const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

    if (storedCsrfToken && !isRead) {
      const response = await fetch(
        apiUrl.updateUserNotifications + idNotification + "/",
        {
          method: "PUT",
          headers: {
            "X-CSRFToken": storedCsrfToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ leido: true }),
          credentials: "include",
        }
      );

      if (response.ok) {
        // const data = await response.json();

        console.log("SALIOOOO BIENNNNNNN ESTA EN TRUEEEEEE");
      } else {
        console.log("SALIO MALLLLLLLLLLLLLL");
      }
    }
  };

  const cropMessage = (notification) => {
    // Límite de caracteres aquí
    const characterLimit = 30;

    // Verifica si la notificación excede el límite de caracteres
    if (notification.length > characterLimit) {
      // Si es más largo, recorta el mensaje y agrega "..."
      notification = notification.substring(0, characterLimit) + "...";
    }

    return notification;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleNotificationPress(item.notificacion.mensaje, item.id, item.leido)
            }
            style={styles.notificationItem}
          >
            <View style={styles.notificationContent}>
              <View style={styles.iconContainer}>
                {item.leido ? (
                  <Ionicons
                    name="md-checkmark"
                    size={32}
                    color="green"
                    style={styles.notificationIcon}
                  />
                ) : (
                  <Ionicons
                    name="chatbox-outline"
                    size={32}
                    color="red"
                    style={styles.notificationIcon}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    item.leido
                      ? styles.notificationMessageRead
                      : styles.notificationMessageUnread,
                  ]}
                >
                  {cropMessage(item.notificacion.mensaje)}
                </Text>
                <Text style={styles.notificationDate}>
                  {formatDate(item.notificacion.fecha)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal para mostrar el mensaje completo */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{selectedNotification}</Text>
            <Button
              title="Cerrar"
              onPress={() => {
                setSelectedNotification(null);
                setIsModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationScreen;
