import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";

const Stack = createStackNavigator();

describe("LoginScreen", () => {
  it("debería renderizar el componente y contener elementos esperados", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    // Verifica que el componente se haya renderizado correctamente
    expect(getByText("Inicio de Sesión")).toBeTruthy();
    expect(getByPlaceholderText("Correo electrónico")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(getByText("Iniciar Sesión")).toBeTruthy();
    expect(getByText("Registrarse")).toBeTruthy();
  });

  it("debería mostrar un mensaje de error si no se proporciona un correo electrónico o contraseña", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    // Simula hacer clic en el botón "Iniciar Sesión" sin completar los campos
    fireEvent.press(getByText("Iniciar Sesión"));

    // Verifica que se muestre un mensaje de error
    expect(getByText("Por favor, ingresa ambos campos.")).toBeTruthy();
  });

});
