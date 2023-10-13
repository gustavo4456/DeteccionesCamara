import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import validator from "validator"; // Importa el paquete validator
import * as ImagePicker from "expo-image-picker";
import { isValid, parseISO } from "date-fns";
import * as SecureStore from "expo-secure-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import imgUserDefault from "../../assets/usuario.png";
import styles from "./styles";
import apiUrl from "../../api/apiUrls";
import CustomButton from "../../components/CustomButton/CustomButton";

const UserProfileScreen = () => {
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

  useEffect(() => {
    const checkAuthentication = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
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
          } else {
            console.log("userJson no tiene datos.");
          }
        }
      }
    };

    requestPermission();
    checkAuthentication();
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
      setMessage("Por favor, selecciona una imagen de perfil.");
      return;
    }

    if (hasError) {
      setIsError(true);
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
      }
    } catch (error) {
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

  return (
    <KeyboardAwareScrollView
      style={styles.container} // Establece un estilo para el componente KeyboardAwareScrollView.
      contentContainerStyle={styles.contentContainer} // Aplica tus estilos al contenedor de contenido interno.
      resetScrollToCoords={{ x: 0, y: 0 }} // Restablece la posición de desplazamiento a las coordenadas (0, 0) en reinicios.
      scrollEnabled={true} // Habilita el desplazamiento vertical.
      extraScrollHeight={100} // Proporciona un espacio adicional de desplazamiento vertical de 100 unidades.
    >
      <Text style={styles.title}>Cambiar datos del usuario</Text>

      {/* Botón para seleccionar la imagen de perfil */}

      <CustomButton
        text="Seleccionar Imagen de Perfil"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={selectProfileImage} // Se asigna la función que deseas ejecutar
      />

      {/* Muestra la imagen de perfil seleccionada o una imagen por defecto */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={imgUserDefault} style={styles.profileImage} />
      )}

      {/* ... Campos de entrada para otros datos personales ... */}

      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          resetMessage();
        }}
      />
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          resetMessage();
        }}
      />
      <TextInput
        style={[styles.input, firstNameError ? styles.inputError : null]}
        placeholder="Nombre"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          resetMessage();
        }}
      />
      <TextInput
        style={[styles.input, lastNameError ? styles.inputError : null]}
        placeholder="Apellido"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          resetMessage();
        }}
      />
      <TextInput
        style={[styles.input, birthdateError ? styles.inputError : null]}
        placeholder="Fecha de nacimiento (AAAA-MM-DD)"
        value={birthdate}
        onChangeText={(text) => {
          setBirthdate(text);
          resetMessage();
        }}
      />
      <TextInput
        style={[styles.input, genderError ? styles.inputError : null]}
        placeholder="Género"
        value={gender}
        onChangeText={(text) => {
          setGender(text);
          resetMessage();
        }}
      />

      <CustomButton
        text="Guardar"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={handleRegister} // Se asigna la función que deseas ejecutar
      />
      <Text style={isError ? styles.errorMessage : styles.successMessage}>
        {message}
      </Text>
    </KeyboardAwareScrollView>
  );
};

export default UserProfileScreen;
