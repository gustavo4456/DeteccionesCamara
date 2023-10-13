import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store"; // Importa SecureStore de Expo

import urlsApi from "../../api/apiUrls";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      
      <CustomButton
        text="Iniciar Sesión"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={handleLogin} // Se asigna la función que deseas ejecutar
      />
      <CustomButton
        text="Registrarse"
        theme="ligth" // Tema claro (se puede usar "dark" para oscuro)
        onPress={() => navigation.navigate("Register")} // Se asigna la función que deseas ejecutar
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default LoginScreen;
