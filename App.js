import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CameraPhone from "./components/CameraPhone/CameraPhone";
import { useState } from "react";
import AppStack from "./navigator/AppStack";
import { GlobalContextProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalContextProvider>
      <AppStack />
    </GlobalContextProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
