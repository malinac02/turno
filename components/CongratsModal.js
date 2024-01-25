import Modal from "react-native-modal";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Switch, Pressable } from "react-native";
import Images from "../assets/Themes/Images/index.js";
import { useFonts } from "expo-font";
import PostPreview from "./PostPreview.js";
import Themes from "../assets/Themes/themes.js";
import Fire from "./Icons/Fire";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { PostsContext } from "../contexts/PostsContext.js";
import { ActivitiesContext } from "../contexts/ActivitiesContext.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function CongratsModal({
  activityName,
  activityIndex,
  isModalVisible,
  setModalVisible,
  switchEnabled,
  setSwitchEnabled,
  setActiveScreen,
  setAppearHeader,
}) {
  const { deleteActivity } = useContext(ActivitiesContext);

  const onExitModal = () => {
    if (!switchEnabled) {
      console.log("deletingActivity of index: " + activityIndex);
      deleteActivity(activityIndex);
    }
    setModalVisible(false);
    setActiveScreen("RollDice");
    setAppearHeader(false);
  };

  const { addPost } = useContext(PostsContext);
  const { posts } = useContext(PostsContext);

  const postActivity = async () => {
    console.log(activityName)
  };

  return (
    <Modal
      onBackdropPress={onExitModal}
      onBackButtonPress={onExitModal}
      isVisible={isModalVisible}
      swipeDirection="down"
      onSwipeComplete={onExitModal}
      // animationIn="bounceInUp"
      // animationOut="bounceOutDown"
      animationInTiming={800}
      animationOutTiming={500}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.barIcon} />
        <Image source={Images.confetti} style={styles.confetti} />
        <Text style={styles.title}>Congrats!</Text>
        <PostPreview activityName={activityName} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.circle}>
              <FontAwesome5
                name="dice-two"
                size={50}
                color={Themes.colors.salmon}
              />
              <Text style={styles.circleText}>x34</Text>
            </View>
            <Text style={styles.circleDescription}>
              You have rolled the dice 34 times
            </Text>
          </View>
          <View style={styles.stat}>
            <View style={styles.circle}>
              <Fire width={44} height={57} />
              <Text style={styles.circleText}>x10</Text>
            </View>
            <Text style={styles.circleDescription}>
              Congrats on your 10 day streak
            </Text>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <Text> Add "{activityName}" back to Activities List?</Text>
          <Switch
            trackColor={{ true: Themes.colors.salmon }}
            thumbColor={"white"}
            ios_backgroundColor={Themes.colors.mediumGray}
            onValueChange={() => setSwitchEnabled(!switchEnabled)}
            value={switchEnabled}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={postActivity}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Post</Text>
              <MaterialCommunityIcons
                name="send-circle-outline"
                size={30}
                color="white"
              />
            </View>
          </Pressable>

          <Pressable onPress={onExitModal}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Done</Text>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={30}
                color="white"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    // paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // minHeight: 600,
    height: 600,
    paddingBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  confetti: {
    position: "absolute",
    top: 5,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontFamily: "Poppins-Bold",
  },
  statsContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    maxWidth: "50%",
  },
  circle: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: Themes.colors.salmon,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontSize: 40,
    fontFamily: "Poppins-Regular",
  },
  circleDescription: {
    fontSize: 15,
    // lineHeight: 30,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  toggleContainer: {
    width: "102%",
    marginTop: 20,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Themes.colors.mediumGray,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  addCommentButton: {
    alignSelf: "center", // Center the button
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue", // Change color as needed
    borderRadius: 5,
  },
  addCommentButtonText: {
    color: "white", // Change color as needed
  },
  buttonsContainer: {
    height: 70,
    flexDirection: "row",
    gap: 50,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: Themes.colors.salmon,
    width: 120,
    height: "90%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
});
