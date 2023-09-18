import React, { useLayoutEffect, useState } from "react";
import { View, TochableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import * as SecureStore from "expo-secure-store";
import urlsApi from "../../api/apiUrls";

//assets
import logout from "../../assets/logout.png";
import user from "../../assets/usuario.png";

// import auth from "../../api/outhState";
// import authLogout from "../../api/logout";

export default function CustomDrawerContent(props) {
  const [avatar, setAvatar] = useState("");

  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      // Obtener el token CSRF desde SecureStore
      const storedCsrfToken = await SecureStore.getItemAsync("csrfToken");

      if (storedCsrfToken) {
        // Realizar la solicitud de comprobación de autenticación
        const response = await fetch(urlsApi.checkAuthentication, {
          headers: {
            "X-CSRFToken": storedCsrfToken,
          },
          credentials: "include",
        });

        if (response.ok) {
          const userJson = await response.json();

          console.log(userJson.user_data.foto_perfil);
          if (userJson && userJson.user_data.foto_perfil) {
            setAvatar(urlsApi.base + userJson.user_data.foto_perfil);
            console.log("avatarrrrr", avatar);
          }
        }
      }
    };

    checkAuthentication();
    // auth
    //   .get()
    //   .then((usr) => {
    //     if (usr && usr.photoURL) {
    //       console.log(usr.photoURL);
    //       setAvatar(usr.photoURL);
    //     }
    //   })
    //   .catch();
  }, [props]);

  const handleLogout = async () => {
    try {
      console.log("ENTRO AL CERRAR SESION.");
      const storedToken = await SecureStore.getItemAsync("csrfToken");

      if (!storedToken) {
        console.error("Token CSRF no disponible.");
        return;
      }

      const response = await fetch(urlsApi.logout, {
        method: "POST",
        headers: {
          "X-CSRFToken": storedToken,
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Cierre de sesión exitoso.");
        // Remueve el token CSRF de SecureStore después del cierre de sesión
        await SecureStore.deleteItemAsync("csrfToken");
        // Puedes redirigir a otra pantalla si lo deseas
        // navigation.navigate("Login");
        props.navigation.navigate("Login");
      } else {
        console.error("Error al cerrar sesión.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#283541" }}>
      <View
        style={{
          height: 250,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={avatar ? { uri: avatar } : user}
          style={{ width: 150, height: 150 , borderRadius:80, marginVertical:10 }}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          activeBackgroundColor="#6685A4"
          labelStyle={{ color: "#FFF" }}
          {...props}
        />
      </DrawerContentScrollView>
      <DrawerItem
        label="Cerrar sesión"
        labelStyle={{ color: "#FFF" }}
        style={{ marginBottom: 25 }}
        icon={() => (
          <Image
            source={logout}
            style={{ width: 20, height: 20, tintColor: "#FFF" }}
          />
        )}
        onPress={handleLogout}
      />
    </View>
  );
}
