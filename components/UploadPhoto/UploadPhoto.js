import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import urlsApi from "../../api/apiUrls";
import * as SecureStore from "expo-secure-store";
import CustomDropdown from "../OptionSelector/CustomDropdown";
import CustomButton from "../CustomButton/CustomButton";

export default function ImagePickerExample() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [apiResponse, setApiResponse] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
    fetch(urlsApi.tags)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setOptions(data);
      })
      .catch((err) => console.log("Eror al traer las etiquetas: " + err));
    requestPermission();
    pickImage();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Lo siento, necesitamos permisos para acceder a la galería de fotos."
        );
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Accede a la URI de la imagen desde el array de assets
      setSelectedImage(result.assets[0].uri);
      setModalVisible(true);
    } else {
      navigation.navigate("Camera", {
        Camera: false,
        gallery: false,
      });
    }
  };

  const cancelModal = () => {
    setSelectedOption(null); //resetear para que no se seleccione la misma etiqueta que fue seleccionada
    setError(null); //Resetear el error, para que cada vez que se tome una foto no aparezca el error en el modal
    setApiResponse(null); //Esto es para que cada vez que tome una foto no se repita el resutado de las imagenes anteriores
    setModalVisible(false);
    navigation.navigate("Camera", {
      Camera: false,
      gallery: false,
    });
  };

  const sendImage = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("csrfToken");
      // Mostrar el indicador de carga antes de enviar la imagen
      setIsSending(true);
      setError(null); // Reseteamos el estado de error antes de hacer la solicitud

      // Verificar si se ha seleccionado una etiqueta
      if (!selectedOption) {
        setError("Seleccione una etiqueta.");
        setIsSending(false);
        return;
      }

      // Preparamos los datos a enviar en el cuerpo de la solicitud
      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        type: "image/jpeg", // Ajusta el tipo de archivo según el formato de la imagen
        name: "image.jpg", // Nombre del archivo, puedes ajustarlo según tu preferencia
      });

      // Agregar la etiqueta seleccionada al cuerpo de la solicitud
      formData.append("etiqueta_id", selectedOption.id.toString());
      formData.append("etiqueta_nombre", selectedOption.nombre);

      // Hacemos la solicitud POST a la API con la imagen capturada
      const response = await fetch(urlsApi.detectMelanoma, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": storedToken,
        },
        body: formData,
      });

      // Verificamos si la solicitud fue exitosa (código 2xx) y manejamos la respuesta
      if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
        // Aquí se maneja la respuesta de la API, como mostrar un mensaje de éxito, etc.
        setApiResponse(responseData);
      } else {
        console.error(
          "Error al enviar la imagen:",
          response.status,
          response.statusText
        );
        setError("Error en la solicitud a la API");
      }

      // Cerramos el modal después de enviar la imagen
      // closeModal();
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      setError("Error en la conexión o servidor");
    } finally {
      // Ocultar el indicador de carga después de completar la solicitud
      setIsSending(false);
      setSelectedOption(null);
    }
  };

  return (
    <View>
      {/* Modal para mostrar la imagen capturada */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={cancelModal}
          >
            <Text style={styles.modalCloseButtonText}>Cerrar</Text>
          </TouchableOpacity>
          {/* Mostrar el indicador de carga solo cuando se está enviando la imagen */}
          {isSending ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.modalImage}
                />
              )}
              {/* <Text>Selected Option: {selectedOption.nombre}</Text> */}
              <CustomDropdown
                options={options}
                defaultValue="Selecciona una etiqueta"
                onSelect={handleOptionSelect}
              />
              
              <CustomButton
                text="Enviar a la API"
                theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
                onPress={sendImage} // Se asigna la función que deseas ejecutar
              />
              {/* Mostrar el resultado solo si apiResponse está definido */}
              {apiResponse && (
                <>
                  <Text style={styles.resultText}>
                    Resultado: {apiResponse.result}
                  </Text>
                  <Text style={styles.resultText}>
                    Precisión: {apiResponse.confidence.toFixed(2) + "%"}
                  </Text>
                </>
              )}
              {/* Mostrar el mensaje de error si hay un error */}
              {error && <Text style={styles.errorText}>{error}</Text>}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}
