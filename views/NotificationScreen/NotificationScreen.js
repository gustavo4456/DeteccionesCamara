import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

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
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const notificationsApi = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(apiUrl.getNotifications, {
          headers: {
            "X-CSRFToken": storedCsrfToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          if (data) {
            // Ordenar las notificaciones por fecha (de más reciente a más antigua)
            data.sort((a, b) => {
              return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
            });
            setNotifications(data);
          } else {
            console.log("data no tiene datos.");
          }
        }
      }
    };
    notificationsApi();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()} // Ajusta la clave según la estructura de tus notificaciones
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationMessage}>{item.mensaje}</Text>
            <Text style={styles.notificationDate}>
              {formatDate(item.fecha)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;
