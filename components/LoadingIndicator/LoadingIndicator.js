import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import styles from "./styles";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
};

export default LoadingIndicator;
