import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import validator from "validator"; // Importa el paquete validator
import * as ImagePicker from "expo-image-picker";
import { isValid, parseISO } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGlobalContext } from "../../contexts/GlobalContext";

import imgUserDefault from "../../assets/usuario.png";
import { lightStyles, darkStyles } from "./styles";

import apiUrl from "../../api/apiUrls"; // Asegúrate de importar tu URL de la API aquí
import CustomButton from "../../components/CustomButton/CustomButton";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [birthdateError, setBirthdateError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  useEffect(() => {
    requestPermission();
  }, []);

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

  const isValidDate = (date) => {
    // Define una expresión regular para el formato "AAAA-MM-DD"
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    // Valida si la fecha coincide con el patrón
    return datePattern.test(date);
  };

  const handleRegister = async () => {
    // Valida los campos antes de enviar la solicitud

    setIsError(true);
    setIsLoading(true);

    setEmailError(false);
    setPasswordError(false);
    setBirthdateError(false);
    setGenderError(false);
    setFirstNameError(false);
    setLastNameError(false);

    let hasError = false;

    if (!validator.isEmail(email)) {
      setEmailError(true);
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError(true);
      hasError = true;
    }

    if (!firstName.trim()) {
      setFirstNameError(true);
      hasError = true;
    }

    if (!lastName.trim()) {
      setLastNameError(true);
      hasError = true;
    }

    if (!isValid(parseISO(birthdate))) {
      setBirthdateError(true);
      hasError = true;
    }

    if (!gender.trim()) {
      setGenderError(true);
      hasError = true;
    }

    if (!profileImage) {
      // Si no se seleccionó una imagen de perfil
      setIsError(true);
      // hasError = true;
      setIsLoading(false);
      setMessage("Por favor, selecciona una imagen de perfil.");
      return;
    }

    if (hasError) {
      setIsLoading(false);
      setIsError(true);
      setMessage("Por favor, corrige los errores en el formulario.");
      return;
    }

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("fecha_nacimiento", birthdate);
    formData.append("sexo", gender);
    // formData.append("foto_perfil", "ruta/a/la/imagen.jpg");
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("is_active", true);

    if (profileImage) {
      // Genera un nombre único para la imagen en el lado del cliente
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime
        .toISOString()
        .replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
      const imageExtension = profileImage.split(".").pop(); // Obtiene la extensión de la imagen
      const imageName = `${email}_${formattedDateTime}.${imageExtension}`;
      // Si se ha seleccionado una imagen, agregala al FormData
      formData.append("foto_perfil", {
        uri: profileImage,
        type: "image/jpeg", // Cambia el tipo de imagen según el formato
        name: imageName, // Nombre de la imagen
      });
    }

    try {
      const response = await fetch(apiUrl.registerUser, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Registro exitoso");
        setEmail("");
        setPassword("");
        setBirthdate("");
        setFirstName("");
        setLastName("");
        setGender("");
        setProfileImage("");

        setIsError(false);

        setMessage("Registro exitoso");
        setIsLoading(false);
      } else {
        // Hubo un error en la solicitud
        setIsError(true);
        setIsLoading(false);
        console.error("Error en el registro");
        setMessage("Error en el registro");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error en la solicitud:", error);
    }
  };

  // Restablece el mensaje solo si hay contenido en message
  const resetMessage = () => {
    if (message) {
      setMessage("");
      setIsError(false);
    }
  };

  const selectProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        console.log("Selección de imagen cancelada");
      } else {
        const selectedAsset = result.assets[0];
        setProfileImage(selectedAsset.uri);
        resetMessage();
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  const styles = isDarkMode ? darkStyles : lightStyles; // Establece los estilos según el modo
  const theme = isDarkMode ? "dark" : "light"; // Establece el tema para los botones
  const placeHolderColor = isDarkMode ? "white" : "black"; // Establece el tema para los botones

  return (
    <KeyboardAwareScrollView
      style={styles.container} // Establece un estilo para el componente KeyboardAwareScrollView.
      contentContainerStyle={styles.contentContainer} // Aplica tus estilos al contenedor de contenido interno.
      resetScrollToCoords={{ x: 0, y: 0 }} // Restablece la posición de desplazamiento a las coordenadas (0, 0) en reinicios.
      scrollEnabled={true} // Habilita el desplazamiento vertical.
      extraScrollHeight={100} // Proporciona un espacio adicional de desplazamiento vertical de 100 unidades.
    >
      <Text style={styles.title}>Registro de Usuario</Text>

      <CustomButton
        text="Seleccionar Imagen de Perfil"
        theme={theme}
        onPress={selectProfileImage}
      />

      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={imgUserDefault} style={styles.profileImage} />
      )}

      <View
        style={[
          styles.inputContainer,
          emailError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign
          name="mail"
          size={24}
          color="gray"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={placeHolderColor}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            resetMessage();
            setEmailError(false);
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          passwordError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign
          name="lock"
          size={24}
          color="gray"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={placeHolderColor}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            resetMessage();
            setPasswordError(false);
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          firstNameError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign
          name="user"
          size={24}
          color="gray"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={placeHolderColor}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            resetMessage();
            setFirstNameError(false);
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          lastNameError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign
          name="user"
          size={24}
          color="gray"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor={placeHolderColor}
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            resetMessage();
            setLastNameError(false);
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          birthdateError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign
          name="calendar"
          size={24}
          color="gray"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (AAAA-MM-DD)"
          placeholderTextColor={placeHolderColor}
          value={birthdate}
          onChangeText={(text) => {
            setBirthdate(text);
            resetMessage();
            setBirthdateError(false);
          }}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          genderError ? styles.inputContainerError : null,
        ]}
      >
        <AntDesign name="man" size={24} color="gray" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Género"
          placeholderTextColor={placeHolderColor}
          value={gender}
          onChangeText={(text) => {
            setGender(text);
            resetMessage();
            setGenderError(false);
          }}
        />
      </View>
      <CustomButton text="Registrar" theme={theme} onPress={handleRegister} />
      <Text style={isError ? styles.errorMessage : styles.successMessage}>
        {message}
      </Text>

      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.modalContainer}>
          <LoadingIndicator />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
