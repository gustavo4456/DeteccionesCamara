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
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useGlobalContext } from "../../contexts/GlobalContext";

import imgUserDefault from "../../assets/usuario.png";
import { lightStyles, darkStyles } from "./styles";
import apiUrl from "../../api/apiUrls";
import CustomButton from "../../components/CustomButton/CustomButton";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const UserProfileScreen = () => {
  const isFocused = useIsFocused();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [userId, setUserId] = useState();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [birthdateError, setBirthdateError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  useEffect(() => {
    const getConfigUser = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        setIsLoading(true);
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
            setIsLoading(false);
            setNotificationsEnabled(configUser.notificaciones_habilitadas);
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
    const checkAuthentication = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        setIsLoading(true);
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(apiUrl.checkAuthentication, {
          headers: {
            "X-CSRFToken": storedCsrfToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const userJson = await response.json();

          // console.log(userJson.user_data.foto_perfil);
          // && userJson.user_data.foto_perfil
          if (userJson) {
            setEmail(userJson.user_data.email);
            setPassword(userJson.user_data.password);
            setFirstName(userJson.user_data.first_name);
            setLastName(userJson.user_data.last_name);
            setBirthdate(userJson.user_data.fecha_nacimiento);
            setGender(userJson.user_data.sexo);
            setProfileImage(apiUrl.base + userJson.user_data.foto_perfil);

            setUserId(userJson.user_data.id);

            setIsLoading(false);

          } else {
            setIsLoading(false);
            console.log("userJson no tiene datos.");
          }
        } else {
          setIsLoading(false);
        }
      }
    };

    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setBirthdateError(false);
    setGenderError(false);

    resetMessage();

    requestPermission();
    checkAuthentication();
    getConfigUser();
  }, [isFocused]);

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
    setIsLoading(true);
    // Obtener el token CSRF desde SecureStore
    const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

    // Valida los campos antes de enviar la solicitud

    setIsError(true);

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
      setIsLoading(false);
      setMessage("Por favor, selecciona una imagen de perfil.");
      return;
    }

    if (hasError) {
      setIsError(true);
      setIsLoading(false);
      setMessage("Por favor, corrige los errores en el formulario.");
      return;
    }

    // Crear un objeto FormData para enviar los datos del usuario
    const formData = new FormData();

    // Agregar los campos que deseas actualizar al FormData
    formData.append("username", email);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("fecha_nacimiento", birthdate);
    formData.append("sexo", gender);
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

    console.log(apiUrl.updateUser + `${userId}/`);

    try {
      const response = await fetch(apiUrl.updateUser + `${userId}/`, {
        method: "PUT",
        headers: {
          "X-CSRFToken": storedCsrfToken,
        },
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        console.log(response);
        console.log("Cambio de datos exitoso");
        setIsLoading(false);
        // setEmail("");
        // setPassword("");
        // setBirthdate("");
        // setFirstName("");
        // setLastName("");
        // setGender("");

        setIsError(false);

        setMessage("Cambios realizados con exito");
      } else {
        // Hubo un error en la solicitud
        setIsError(true);
        console.error("Error en el registro");
        setMessage("Error en el registro");
        setIsLoading(false);
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

      <CustomButton
        text="Guardar"
        theme={theme} // Tema claro (se puede usar "dark" para oscuro)
        onPress={handleRegister} // Se asigna la función que deseas ejecutar
      />
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

export default UserProfileScreen;
