import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import * as Localization from "expo-localization";
import translations from "./translations";
import urlsApi from "../../api/apiUrls";
import * as SecureStore from "expo-secure-store";
import CustomDropdown from "../OptionSelector/CustomDropdown";

export default function CameraPhone() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Obtén el idioma del dispositivo.
  const deviceLanguage = Localization.locale.split("-")[0];

  // Selecciona las traducciones según el idioma del dispositivo.
  const translatedStrings = translations[deviceLanguage] || translations.en;

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          {translatedStrings.permissionText}
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            {translatedStrings.permissionButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlashMode() {
    setFlashMode((current) => {
      switch (current) {
        case FlashMode.off:
          return FlashMode.on;
        case FlashMode.on:
          return FlashMode.auto;
        case FlashMode.auto:
          return FlashMode.off;
        default:
          return FlashMode.off;
      }
    });
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", photo.uri);
      setCapturedImage(photo.uri); // Guardar la ruta de la imagen capturada
      setModalVisible(true);
    }
  }

  function closeModal() {
    setSelectedOption(null); //resetear para que no se seleccione la misma etiqueta que fue seleccionada
    setError(null); //Resetear el error, para que cada vez que se tome una foto no aparezca el error en el modal
    setApiResponse(null); //Esto es para que cada vez que tome una foto no se repita el resutado de las imagenes anteriores
    setModalVisible(false); // Cerrar el modal
  }

  function closeCamera() {
    navigation.navigate("Camera", {
      Camera: false,
      gallery: false,
    });
  }

  async function sendImageToApi() {
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
        uri: capturedImage,
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
        setError(translatedStrings.errorApi);
      }

      // Cerramos el modal después de enviar la imagen
      // closeModal();
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      setError(translatedStrings.errorServer);
    } finally {
      // Ocultar el indicador de carga después de completar la solicitud
      setIsSending(false);
      setSelectedOption(null);
    }
  }

  return (
    <View style={styles.container}>
      {modalVisible ? null : (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View style={styles.buttonCloseContainer}>
            <TouchableOpacity style={styles.button} onPress={closeCamera}>
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.buttonText}>
                {translatedStrings.buttonToggleCamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
              <Text style={styles.buttonText}>
                {translatedStrings.buttonToggleFlashCamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>
                {translatedStrings.buttonTakePhotoCamera}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {/* Modal para mostrar la imagen capturada */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeModal}
          >
            <Text style={styles.modalCloseButtonText}>
              {translatedStrings.close}
            </Text>
          </TouchableOpacity>
          {/* Mostrar el indicador de carga solo cuando se está enviando la imagen */}
          {isSending ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {capturedImage && (
                <Image
                  source={{ uri: capturedImage }}
                  style={styles.modalImage}
                />
              )}

              {/* <Text>Selected Option: {selectedOption.nombre}</Text> */}
              <CustomDropdown
                options={options}
                defaultValue="Selecciona una etiqueta"
                onSelect={handleOptionSelect}
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendImageToApi}
              >
                <Text style={styles.sendButtonText}>
                  {translatedStrings.sendToApi}
                </Text>
              </TouchableOpacity>
              {/* Mostrar el resultado solo si apiResponse está definido */}
              {apiResponse && (
                <>
                  <Text style={styles.resultText}>
                    {translatedStrings.result} {apiResponse.result}
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
