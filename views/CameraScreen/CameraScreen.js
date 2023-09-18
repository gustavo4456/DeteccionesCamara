import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CameraPhone from "../../components/CameraPhone/CameraPhone";

import styles from "./styles";
import UploadPhoto from "../../components/UploadPhoto/UploadPhoto";

const CamaraScreen = ({ navigation, route }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handleSelectImage = () => {
    setShowGallery(true);
  };

  useEffect(() => {
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
  }, [navigation, route.params]);

  return (
    <View style={styles.container}>
      {showCamera && <CameraPhone />}

      {showGallery && <UploadPhoto />}

      {!showGallery && !showCamera && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
            <Text style={styles.buttonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CamaraScreen;
