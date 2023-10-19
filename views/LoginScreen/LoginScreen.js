import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store"; // Importa SecureStore de Expo
import { useGlobalContext } from "../../contexts/GlobalContext";

import urlsApi from "../../api/apiUrls";
import { lightStyles, darkStyles } from "./styles";
import { useIsFocused } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage("Por favor, ingresa ambos campos.");
        return;
      }

      const response = await fetch(urlsApi.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const token = response.headers
          .get("set-cookie")
          .split(";")[0]
          .split("=")[1];

        // Almacena el token CSRF en SecureStore de Expo
        await SecureStore.setItemAsync("csrfToken", token);

        navigation.navigate("Home");
      } else {
        setErrorMessage("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("No se pudo iniciar sesión en este momento.");
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (isFocused && storedCsrfToken) {
        setIsLoading(true);
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(urlsApi.checkAuthentication, {
          headers: {
            "X-CSRFToken": storedCsrfToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          // Si el usuario está autenticado, redirigir a "Home"
          navigation.navigate("Home");
        }

        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [isFocused]);

  const styles = isDarkMode ? darkStyles : lightStyles; // Establece los estilos según el modo
  const theme = isDarkMode ? "dark" : "light"; // Establece el tema para los botones
  const placeHolderColor = isDarkMode ? "white" : "black"; // Establece el tema para los botones

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={placeHolderColor}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={placeHolderColor}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
        />
      </View>

      <View style={styles.inputContainerRegister}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View style={styles.buttonContainer}>
        <CustomButton
          text="Iniciar Sesión"
          theme={theme}
          onPress={handleLogin}
        />
      </View>

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={styles.loading}
        />
      )}
    </View>
  );
};

export default LoginScreen;
