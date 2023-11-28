import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ActivityModal({ isVisible, closeModal, activity, section }) {
  const handlePressOutside = () => {
    closeModal();
  };

  const otherSection = 
    (section === "Current Activities") ? "Pending Activities" : "Current Activities";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text>Activity: {activity[0]} </Text>
            <Text>Description: {activity[1]} </Text>
            <Text>Category: {activity[2]} </Text>
            <MaterialCommunityIcons name="trash-can-outline" size={40} color="black" />
            <MaterialCommunityIcons name="pencil-outline" size={40} color="black" />
            <Text>Move to: {otherSection} </Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    height: 320,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});