import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CameraPhone from "../../components/CameraPhone/CameraPhone";
import { useGlobalContext } from "../../contexts/GlobalContext";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

import { lightStyles, darkStyles } from "./styles";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";
import CustomButton from "../../components/CustomButton/CustomButton";
import apiUrl from "../../api/apiUrls"; // Asegúrate de importar tu URL de la API aquí

const CamaraScreen = ({ navigation, route }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { isDarkMode, setIsDarkMode } = useGlobalContext();
  const isFocused = useIsFocused();

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handleSelectImage = () => {
    setShowGallery(true);
  };

  useEffect(() => {
    const getConfigUser = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
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
            setIsDarkMode(configUser.tema_preferido);
          } else {
            console.log("configUser no tiene datos.");
          }
        }
      }
    };
    const resetStateView = () => {
      console.log(route);
      // Restablecer el estado al entrar en la vista
      if (route.params && route.params.Camera === false) {
        setShowCamera(false);
      }
      if (route.params && route.params.gallery === false) {
        setShowGallery(false);
      }

      const unsubscribe = navigation.addListener("focus", () => {
        setShowCamera(false);
        setShowGallery(false);
      });

      return unsubscribe;
    };

    resetStateView();
    getConfigUser();
  }, [navigation, route.params, isFocused]);

  const styles = isDarkMode ? darkStyles : lightStyles; // Establece los estilos según el modo
  const theme = isDarkMode ? "dark" : "light"; // Establece el tema para los botones

  return (
    <View style={styles.container}>
      {showCamera && <CameraPhone />}

      {showGallery && <UploadPhoto />}

      {!showGallery && !showCamera && (
        <View>
          <Text style={styles.title}>¿Qué deseas hacer?</Text>
          <Text style={styles.description}>
            Elige una opción para cargar una foto y analizarla.
          </Text>

          <CustomButton
            text="Tomar Foto"
            theme={theme} // Tema claro (se puede usar "dark" para oscuro)
            onPress={handleTakePhoto} // Se asigna la función que deseas ejecutar
          >
            <Text style={styles.buttonText}>Tomar una foto con la cámara</Text>
          </CustomButton>

          <CustomButton
            text="Seleccionar Imagen"
            theme={theme} // Tema claro (se puede usar "dark" para oscuro)
            onPress={handleSelectImage} // Se asigna la función que deseas ejecutar
          >
            <Text style={styles.buttonText}>
              Seleccionar una imagen de la galería
            </Text>
          </CustomButton>
        </View>
      )}
    </View>
  );
};

export default CamaraScreen;
