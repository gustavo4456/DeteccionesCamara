import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useIsFocused } from "@react-navigation/native";

// Components
import DrawerComponent from "../components/Drawer/Drawer";

// Routes
import Routes from "./DrawerRoutes";

import * as SecureStore from "expo-secure-store";
import urlsApi from "../api/apiUrls";
import { StyleSheet, Text, View } from "react-native";

const Drawer = createDrawerNavigator();

// Container #283541
// Current #6685A4

export default function DrawerNavigator() {
  const { notifications, setNotifications } = useGlobalContext([]);
  const { countNotifications, setCountNotifications } = useGlobalContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getNotifications = async () => {
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        const response = await fetch(urlsApi.getUserNotifications, {
          method: "GET",
          headers: {
            "X-CSRFToken": storedCsrfToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          const unreadNotifications = data.filter(
            (notificacion) => !notificacion.leido
          );

          setCountNotifications(unreadNotifications.length);

          data.sort((a, b) => {
            return (
              new Date(b.notificacion.fecha).getTime() -
              new Date(a.notificacion.fecha).getTime()
            );
          });

          setNotifications(data);
        }
      }
    };

    // Ejecutar la función inicialmente
    getNotifications();

    // Establecer un intervalo para ejecutar getNotifications cada segundo
    const intervalId = setInterval(() => {
      getNotifications();
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta o cuando la pantalla ya no está enfocada
    return () => clearInterval(intervalId);
  }, []);

  const NotificationsCountView = ({ count }) => {
    return (
      <View style={styles.containerNotificationCount}>
        <Text style={styles.notificationText}>Notificaciones</Text>
        <View style={styles.notificationView}>
          <Text style={styles.NumNotificationText}>{count}</Text>
        </View>
      </View>
    );
  };

  const NotificationsCountTitle = ({ count }) => {
    return (
      <View style={styles.containerNotificationCountTitle}>
        <Text style={styles.notificationTextTitle}>Notificaciones</Text>
        <View style={styles.notificationViewTitle}>
          <Text style={styles.NumNotificationTextTitle}>{count}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    containerNotificationCount: {
      flexDirection: "row", // Para que el texto y el contador estén en una fila
      alignItems: "center", // Alinea los elementos verticalmente en el centro
    },
    notificationView: {
      backgroundColor: "red",
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationText: {
      fontSize: 20,
      marginRight: 10, // Espacio entre el contador y el texto
      color: "white",
      fontWeight: "bold",
    },
    NumNotificationText: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
    },

    // para el drawer
    containerNotificationCountTitle: {
      flexDirection: "row", // Para que el texto y el contador estén en una fila
      alignItems: "center", // Alinea los elementos verticalmente en el centro
    },
    notificationViewTitle: {
      backgroundColor: "red",
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationTextTitle: {
      fontSize: 14,
      marginRight: 10, // Espacio entre el contador y el texto
      color: "#396261",
      fontWeight: "bold",
    },
    NumNotificationTextTitle: {
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <Drawer.Navigator
      headerMode="screen"
      drawerContent={(props) => <DrawerComponent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6685A4", // Cambia el color de fondo del encabezado
        },
        headerTintColor: "#FFF", // Cambia el color del texto del encabezado
      }}
    >
      <Drawer.Screen
        name="Camera"
        component={Routes.Camera}
        options={{ title: "Subir Imagen" }}
      />
      <Drawer.Screen
        name="MyPhotos"
        component={Routes.MyPhotos}
        options={{ title: "Mis Imagenes" }}
      />
      <Drawer.Screen
        name="DetectionHistory"
        component={Routes.DeteccionHistory}
        options={{ title: "Historial Detecciones" }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={Routes.UserProfile}
        options={{ title: "Perfil de Usuario" }}
      />
      <Drawer.Screen
        name="Notification"
        component={Routes.Notificaciones}
        options={{
          headerTitle: () => (
            <NotificationsCountView count={countNotifications} />
          ),
          title: () => <NotificationsCountTitle count={countNotifications} />,
        }}
      />
      <Drawer.Screen
        name="Configuration"
        component={Routes.Configuration}
        options={{ title: "Configuración" }}
      />
    </Drawer.Navigator>
  );
}
