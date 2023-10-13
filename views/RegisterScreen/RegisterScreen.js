import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import validator from "validator"; // Importa el paquete validator
import * as ImagePicker from "expo-image-picker";
import { isValid, parseISO } from "date-fns";

import imgUserDefault from "../../assets/usuario.png";
import styles from "./styles"; // Asegúrate de importar tus estilos aquí
import apiUrl from "../../api/apiUrls"; // Asegúrate de importar tu URL de la API aquí
import CustomButton from "../../components/CustomButton/CustomButton";

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

        setIsError(false);

        setMessage("Registro exitoso");
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
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

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
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, firstNameError ? styles.inputError : null]}
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={[styles.input, lastNameError ? styles.inputError : null]}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={[styles.input, birthdateError ? styles.inputError : null]}
        placeholder="Fecha de nacimiento (AAAA-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        style={[styles.input, genderError ? styles.inputError : null]}
        placeholder="Género"
        value={gender}
        onChangeText={setGender}
      />
      <CustomButton
        text="Registrar"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={handleRegister} // Se asigna la función que deseas ejecutar
      />
      <Text style={isError ? styles.errorMessage : styles.successMessage}>
        {message}
      </Text>
    </View>
  );
};

export default RegisterScreen;
