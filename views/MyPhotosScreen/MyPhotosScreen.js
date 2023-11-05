import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import urlApi from "../../api/apiUrls";
import { lightStyles, darkStyles } from "./styles";
import CustomDropdown from "../../components/OptionSelector/CustomDropdown";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useGlobalContext } from "../../contexts/GlobalContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const MyPhotosScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionOrder, setSelectedOptionOrder] = useState("desc"); // Valor predeterminado para el orden
  const [options, setOptions] = useState([]);
  const [detections, setDetections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  const fileUri = FileSystem.cacheDirectory + "tmp.jpg";

  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const optionsOrder = [
    { id: 1, nombre: "asc" },
    { id: 2, nombre: "desc" },
  ];

  useEffect(() => {
    const getConfigUser = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        setIsLoading(true);
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(urlApi.getOrUpdateConfig, {
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
            setIsLoading(false);
            setIsDarkMode(configUser.tema_preferido);
          } else {
            setIsLoading(false);
            console.log("configUser no tiene datos.");
          }
        } else {
          setIsLoading(false);
        }
      }
    };
    // Función para obtener las etiquetas
    const getTags = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync("csrfToken");

        if (!storedToken) {
          setIsLoading(false);
          console.error("Token CSRF no disponible.");
          return;
        }

        const response = await fetch(urlApi.tags, {
          method: "GET",
          headers: {
            "X-CSRFToken": storedToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          console.log("Etiquetas obtenidas exitosamente.");
          // Agregar el nuevo elemento "Todo" al array de etiquetas
          const updatedData = [{ id: "todo", nombre: "Todo" }, ...data];
          setOptions(updatedData);
        } else {
          setIsLoading(false);
          console.error("Error al obtener las etiquetas.");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error en la solicitud:", error);
      }
    };

    // Función para obtener las detecciones de imágenes
    const getImgDetectionsUser = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync("csrfToken");

        if (!storedToken) {
          setIsLoading(false);
          console.error("Token CSRF no disponible.");
          return;
        }

        // Construir la cadena de consulta
        let queryString = `?orden=${selectedOptionOrder}`;

        // Verificar si se ha seleccionado una etiqueta
        if (selectedOption) {
          queryString += `&etiqueta_id=${selectedOption}`;
        }

        const response = await fetch(urlApi.getDetectionsUsers + queryString, {
          method: "GET",
          headers: {
            "X-CSRFToken": storedToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          console.log("Detecciones obtenidas exitosamente.");
          setDetections(data.detecciones);
        } else {
          setIsLoading(false);
          console.error("Error al obtener las detecciones.");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error en la solicitud:", error);
      }
    };

    // Llamar a las funciones para obtener etiquetas y detecciones en el montaje del componente
    getTags();
    getImgDetectionsUser();
    getConfigUser();
  }, [selectedOption, selectedOptionOrder, isFocused]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option.id);
  };

  const handleOptionSelectOrder = (option) => {
    setSelectedOptionOrder(option.nombre);
  };

  // Función para abrir el modal con la imagen seleccionada
  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  // Función para compartir la imagen seleccionada
  const handleShareImage = () => {
    const options = {
      mimeType: "image/jpeg",
      dialogTitle: "Share the image",
      UTI: "image/jpeg",
    };

    FileSystem.downloadAsync(selectedImage, fileUri)
      .then(({ uri }) => {
        // setState(`Downloaded image to ${uri}`);
      })
      .catch((err) => {
        // setState("Error downloading image");
        console.log(JSON.stringify(err));
      });

    // Sharing only allows one to share a file.
    Sharing.shareAsync(fileUri, options)
      .then((data) => {
        // setState("Shared");
      })
      .catch((err) => {
        // setState("Error sharing image");
        console.log(JSON.stringify(err));
      });
  };

  const styles = isDarkMode ? darkStyles : lightStyles; // Establece los estilos según el modo

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <CustomDropdown
          options={options}
          defaultValue="Selecciona una etiqueta"
          onSelect={handleOptionSelect}
        />
        <CustomDropdown
          options={optionsOrder}
          defaultValue="Ordenar por fecha"
          onSelect={handleOptionSelectOrder}
        />
      </View>

      <FlatList
        data={detections}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item.deteccion.imagen)}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.deteccion.imagen }}
                style={styles.image}
              />
              <Text style={styles.textResult}>{item.deteccion.resultado}</Text>
              <Text style={styles.textResult}>{item.deteccion.precision}%</Text>
              <Text style={styles.textResult}>{item.etiqueta.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal para mostrar la imagen */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Botón "X" en la parte superior derecha */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          )}
          {/* Botones "Compartir" */}
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Compartir"
              theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
              onPress={handleShareImage} // Se asigna la función que deseas ejecutar
            />
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modalContainerIndicator}>
          <LoadingIndicator />
        </View>
      </Modal>
    </View>
  );
};

export default MyPhotosScreen;
