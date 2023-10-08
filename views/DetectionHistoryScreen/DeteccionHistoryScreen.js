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
  const [selectedOptionOrder, setSelectedOptionOrder] = useState("desc");
  const [options, setOptions] = useState([]);
  const [detections, setDetections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const isFocused = useIsFocused();

  const fileUri = FileSystem.cacheDirectory + "tmp.jpg";

  const optionsOrder = [
    { id: 1, nombre: "asc" },
    { id: 2, nombre: "desc" },
  ];

  useEffect(() => {
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
          const updatedData = [{ id: "todo", nombre: "Todo" }, ...data];
          setOptions(updatedData);
        } else {
          console.error("Error al obtener las etiquetas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    const getImgDetectionsUser = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("csrfToken");

        if (!storedToken) {
          console.error("Token CSRF no disponible.");
          return;
        }

        let queryString = `?orden=${selectedOptionOrder}`;

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

    getTags();
    getImgDetectionsUser();
  }, [selectedOption, selectedOptionOrder, isFocused]);

  const formatDate = (dateStr) => {
    const fecha = new Date(dateStr);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return fecha.toLocaleString(undefined, options);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.id);
  };

  const handleOptionSelectOrder = (option) => {
    setSelectedOptionOrder(option.nombre);
  };

  const toggleSelection = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      console.log("se oprimiooo borrarrrr.");
      const storedToken = await SecureStore.getItemAsync("csrfToken");

      console.log("paso el storedtoken wait securstore.");

      if (!storedToken) {
        console.error("Token CSRF no disponible.");
        return;
      }

      console.log("paso el !storedtoken");

      // Obtén las ID de las detecciones seleccionadas
      const selectedDetectionIds = selectedImages;
      console.log("paso la obtencions de los id");

      // Verifica si hay detecciones seleccionadas
      if (selectedDetectionIds.length === 0) {
        console.warn("No se han seleccionado detecciones para eliminar.");
        return;
      }

      console.log("paso la verificacion de que hay ids seleccionados.");

      // Crea un objeto que contiene las ID de detecciones a eliminar
      const data = {
        deteccion_ids: selectedDetectionIds,
      };

      console.log("Paso la creacion del data");

      const response = await fetch(urlApi.deleteDetectionsUsers, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": storedToken,
        },
        credentials: "include",
        body: JSON.stringify(data), // Envía el array de IDs como JSON
      });

      console.log(
        "paso el await fetch donde se envia la peticion de eliminar" + response
      );

      if (response.ok) {
        console.log("Detecciones eliminadas exitosamente.");
        // Actualiza la lista local eliminando las detecciones eliminadas
        setDetections((prevDetections) =>
          prevDetections.filter(
            (detection) => !selectedDetectionIds.includes(detection.id)
          )
        );
        console.log("Paso el resonse.ok");
        // Limpia el array de imágenes seleccionadas
        setSelectedImages([]);
        console.log("PASO toodo");
      } else {
        console.error("Error al eliminar las detecciones.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const renderDeteccionItem = (item) => (
    <TouchableOpacity
      onPress={() => toggleSelection(item.id)}
      onLongPress={() => toggleSelection(item.id)}
    >
      <View
        style={[
          styles.row,
          {
            backgroundColor: selectedImages.includes(item.id)
              ? "#f2f2f2"
              : "transparent",
            // Aplica el estilo de fila seleccionada desde tus estilos importados
            ...(selectedImages.includes(item.id) ? styles.selectedRow : {}),
          },
        ]}
      >
        <Text style={styles.cell}>
          {formatDate(item.deteccion.fecha_creacion)}
        </Text>
        <Text style={styles.cell}>{item.deteccion.resultado}</Text>
        <Text style={styles.cell}>{item.deteccion.precision + "%"}</Text>
        <Text style={styles.cell}>{item.etiqueta.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}>Resultado</Text>
        <Text style={styles.headerText}>Precisión</Text>
        <Text style={styles.headerText}>Zona</Text>
      </View>
      <FlatList
        data={detections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderDeteccionItem(item)}
      />
      {selectedImages.length > 0 && (
        <TouchableOpacity
          style={styles.deleteSelectedButton}
          onPress={handleDeleteSelected}
        >
          <Text style={styles.deleteSelectedButtonText}>
            Eliminar Seleccionados
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DeteccionHistoryScreen;
