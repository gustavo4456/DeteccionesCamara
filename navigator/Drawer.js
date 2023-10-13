import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Components
import DrawerComponent from "../components/Drawer/Drawer";

// Routes
import Routes from "./DrawerRoutes";

const Drawer = createDrawerNavigator();

// Container #283541
// Current #6685A4

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      headerMode="screen"
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen name="Camera" component={Routes.Camera} options={{ title: "Subir Imagen" }} />
      <Drawer.Screen name="MyPhotos" component={Routes.MyPhotos} options={{ title: "Mis Imagenes" }} />
      <Drawer.Screen name="DetectionHistory" component={Routes.DeteccionHistory} options={{ title: "Historial Detecciones" }} />
      <Drawer.Screen name="UserProfile" component={Routes.UserProfile} options={{ title: "Perfil de Usuario" }} />
      <Drawer.Screen name="Notification" component={Routes.Notificaciones} options={{ title: "Notificaciones" }} />
      <Drawer.Screen name="Configuration" component={Routes.Configuration} options={{ title: "Configuración" }} />
      
    </Drawer.Navigator>
  );
}
