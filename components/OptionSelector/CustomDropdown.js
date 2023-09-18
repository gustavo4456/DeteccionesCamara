import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import styles from "./styles";

const CustomDropdown = ({ options, defaultValue, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelect = (item) => {
    setSelectedValue(item.nombre);
    onSelect(item);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.selectedItem}>
        <Text style={styles.selectedText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()} // Usar item.id como clave
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
