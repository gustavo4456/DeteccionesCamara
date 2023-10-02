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
import styles from "./styles";
import CustomDropdown from "../../components/OptionSelector/CustomDropdown";

const DeteccionHistoryScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionOrder, setSelectedOptionOrder] = useState("desc"); // Valor predeterminado para el orden
  const [options, setOptions] = useState([]);
  const [detections, setDetections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
  const isFocused = useIsFocused();

  const fileUri = FileSystem.cacheDirectory + "tmp.jpg";

  const optionsOrder = [
    { id: 1, nombre: "asc" },
    { id: 2, nombre: "desc" },
  ];

  useEffect(() => {
    // Función para obtener las etiquetas
    const getTags = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("csrfToken");

        if (!storedToken) {
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
          console.log("Etiquetas obtenidas exitosamente.");
          // Agregar el nuevo elemento "Todo" al array de etiquetas
          const updatedData = [{ id: "todo", nombre: "Todo" }, ...data];
          setOptions(updatedData);
        } else {
          console.error("Error al obtener las etiquetas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    // Función para obtener las detecciones de imágenes
    const getImgDetectionsUser = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("csrfToken");

        if (!storedToken) {
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
          console.log("Detecciones obtenidas exitosamente.");
          setDetections(data.detecciones);
        } else {
          console.error("Error al obtener las detecciones.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    // Llamar a las funciones para obtener etiquetas y detecciones en el montaje del componente
    getTags();
    getImgDetectionsUser();
  }, [selectedOption, selectedOptionOrder, isFocused]);

  const formatDate = (dateStr) => {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(dateStr);

    // Formatear la fecha y la hora según tus preferencias
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Usar formato de 24 horas
    };

    return fecha.toLocaleString(undefined, options);
  };

  return (
    <View style={styles.container}>
      {/* Cabecera de la tabla */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Imagen</Text> */}
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}>Resultado</Text>
        <Text style={styles.headerText}>Precisión</Text>
        <Text style={styles.headerText}>Zona</Text>
      </View>

      {/* Datos de la tabla */}
      <FlatList
        data={detections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {/* <Text style={styles.cell}>{item.col1}</Text> */}
            <Text style={styles.cell}>
              {formatDate(item.deteccion.fecha_creacion)}
            </Text>
            <Text style={styles.cell}>{item.deteccion.resultado}</Text>
            <Text style={styles.cell}>{item.deteccion.precision + "%"}</Text>
            <Text style={styles.cell}>{item.etiqueta.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DeteccionHistoryScreen;
