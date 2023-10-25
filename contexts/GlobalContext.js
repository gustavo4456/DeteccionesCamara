import React, { createContext, useContext, useState } from "react";

// 1. Crear un contexto
const GlobalContext = createContext();

// 2. Definir un proveedor
export const GlobalContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Valor booleano de ejemplo
  const [countNotifications, setCountNotifications] = useState(0); // Recuento de notificaciones
  const [notifications, setNotifications] = useState([]); // Estado de notificaciones

  return (
    <GlobalContext.Provider value={{ isDarkMode, setIsDarkMode, countNotifications, setCountNotifications, notifications, setNotifications }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3. Crear un gancho personalizado para acceder al contexto
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
