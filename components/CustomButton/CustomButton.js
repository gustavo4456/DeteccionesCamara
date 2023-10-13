import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import styles from "./styles";

const CustomButton = ({ text, theme, onPress }) => {
  const buttonStyle = theme === "dark" ? styles.darkButton : styles.lightButton;

  const textStyle = theme === "dark" ? styles.darkText : styles.lightText;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
