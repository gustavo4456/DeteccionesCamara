import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Button } from "react-native";

import apiUrl from "../../api/apiUrls";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

import styles from "./styles";
import CustomButton from "../../components/CustomButton/CustomButton";

const ConfigurationScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const isFocused = useIsFocused();
  const [saveMessageSuccess, setSaveMessageSuccess] = useState(true);

  useEffect(() => {
    const getConfigUser = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        setSaveMessage("");
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(apiUrl.getOrUpdateConfig, {
          method: "GET",
          headers: {
            "X-CSRFToken": storedCsrfToken,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const configUser = await response.json();

          // console.log(userJson.user_data.foto_perfil);
          // && userJson.user_data.foto_perfil
          if (configUser) {
            setNotificationsEnabled(configUser.notificaciones_habilitadas);
            setDarkThemeEnabled(configUser.tema_preferido);
          } else {
            console.log("configUser no tiene datos.");
          }
        }
      }
    };

    getConfigUser();
  }, [isFocused]);

  // Función para manejar el cambio en la configuración de notificaciones
  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
    setSaveMessage("");
  };

  // Función para manejar el cambio en la configuración de tema oscuro
  const toggleDarkTheme = () => {
    setDarkThemeEnabled((prevState) => !prevState);
    setSaveMessage("");
  };

  const handleRegister = async () => {
    try {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        // Datos de configuración que deseas actualizar
        const newConfig = {
          notificaciones_habilitadas: notificationsEnabled,
          tema_preferido: darkThemeEnabled,
        };

        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(apiUrl.getOrUpdateConfig, {
          method: "PUT",
          headers: {
            "X-CSRFToken": storedCsrfToken,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newConfig),
        });

        if (response.ok) {
          const configUser = await response.json();
          if (configUser) {
            setSaveMessage("Cambios realizados con éxito.");
            setSaveMessageSuccess(true);
          } else {
            setSaveMessage("configUser no tiene datos.");
            setSaveMessageSuccess(false);
          }
        } else {
          setSaveMessage("Hubo un fallo al guardar la configuración.");
          setSaveMessageSuccess(false);
        }
      }
    } catch (error) {
      console.error(error);
      setSaveMessage("Hubo un error al guardar la configuración.");
      setSaveMessageSuccess(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Configuración</Text>

      {/* Switch para habilitar/deshabilitar notificaciones */}
      <View style={styles.setting}>
        <Text>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Switch para seleccionar tema oscuro/claro */}
      <View style={styles.setting}>
        <Text>Tema Oscuro</Text>
        <Switch value={darkThemeEnabled} onValueChange={toggleDarkTheme} />
      </View>

      <CustomButton
        text="Guardar"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={handleRegister} // Se asigna la función que deseas ejecutar
      />
      <Text
        style={[
          saveMessageSuccess ? styles.successMessage : styles.errorMessage,
        ]}
      >
        {saveMessage}
      </Text>
    </View>
  );
};

export default ConfigurationScreen;
