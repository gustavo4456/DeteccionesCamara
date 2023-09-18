import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


//Screen
import Routes from "./StackRouters";
import Home from "./Drawer";

// Assets
import back from "../assets/back.png";

const Stack = createStackNavigator();

const getButton = ({ navigation }) => (
  <TouchableOpacity
    style={{ flexDirection: "row" }}
    onPress={() => navigation.goBack()}
  >
    <Image
      source={back}
      style={{
        width: 15,
        height: 15,
        tintColor: "#FFF",
        marginLeft: 5,
        marginRight: 5,
      }}
    />
    <Text style={{ color: "#FFF" }}>Volver</Text>
  </TouchableOpacity>
);

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Routes.Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Routes.Register} // Cambia a la pantalla de registro
          options={({ navigation }) => ({
            headerLeft: () => getButton({ navigation }), // Botón de volver en la barra de navegación
            headerTitle: "", // Puedes personalizar el título si lo deseas
            headerStyle: { backgroundColor: "#000" }, // Personaliza el estilo de la barra de navegación
            headerTintColor: "#FFF", // Personaliza el color de los elementos en la barra de navegación
          })}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
