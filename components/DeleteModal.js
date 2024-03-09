import Modal from "react-native-modal";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Switch, Pressable } from "react-native";
import Themes from "../assets/Themes/themes.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DeleteModal({ isModalVisible, setModalVisible, onDeleteDice }) {
  const onExitModal = async () => {
    setModalVisible(false);
  };

  return (
    <Modal
      onBackdropPress={onExitModal}
      onBackButtonPress={onExitModal}
      isVisible={isModalVisible}
      swipeDirection="down"
      onSwipeComplete={onExitModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.textContainer}>
          <FontAwesome5 name="exclamation-triangle" size={24} color={Themes.colors.red} />
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.subtitle}>Do you really want to delete this dice? This action cannot be undone.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={onDeleteDice} style={[styles.button, {backgroundColor: Themes.colors.red}]}>
            <Text style={[styles.buttonText, { color: "white" }]}>Delete Dice</Text>
          </Pressable>
          <Pressable onPress={onExitModal} style={[styles.button, {borderWidth: 1}]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    height: 300,
    width: "90%",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  textContainer: {
    alignItems: "center",
    gap: 5
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center"
  },
  buttonsContainer: {
    gap: 10,
  },
  button: {
    width: 260,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
