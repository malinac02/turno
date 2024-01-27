import Modal from "react-native-modal";
import Images from "../assets/Themes/Images/index.js";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Keyboard,
  TouchableOpacity
} from "react-native";
import Comment from "./Comment.js";
import {
  // TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Themes from "../assets/Themes/themes.js";
import { FontAwesome5 } from "@expo/vector-icons";
import { PostsContext } from "../contexts/PostsContext.js";
import Supabase from "../Supabase.js";

export default function CreateActivityModal({
  isModalVisible,
  toggleModal,
  setModalVisible,
  setActivities,
  activities,
}) {

  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState(""); 
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect( () => {
    setIsFormFilled(activityName.trim().length > 0);
  }, [activityName])

  const addToMyDice = () => {
    console.log("add to my dice button pressed")
    if (isFormFilled) {
      //insert activity into second-to-last position to keep [] at the end
      if (activities.length < 2) {
        setActivities([ [activityName, description], ...activities]);
      } else {
        // Slice the array to get all elements except the last two
        const firstPart = activities.slice(0, -1);
        // Get the last two elements
        const lastPart = activities.slice(-1);
        // Concatenate the first part, new activity, and last part
        const newActivities = [...firstPart, [activityName, description], ...lastPart];
        // Update the state with the new array
        setActivities(newActivities);
      }

      setActivityName("");
      setDescription("");
      toggleModal();
    }
  }


  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={isModalVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      // animationIn="fadeInUp"
      // animationOut="fadeOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      avoidKeyboard
      propagateSwipe={true}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.center}>
          <View style={styles.barIcon} />
          <Text style={styles.title}>Create Activity</Text>
          <View style={styles.activityNameContainer}>
            <Text style={styles.subTitle}>
              Activity Name<Text style={styles.asterick}>*</Text>
            </Text>
            <TextInput
              editable
              multiline
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              numberOfLines={4}
              style={styles.input}
              placeholder="Ex. Go on a run around Lake Lagunita"
              value={activityName}
              onChangeText={setActivityName}
            />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.subTitle}>Description</Text>
            <TextInput
              editable
              multiline
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              numberOfLines={4}
              style={styles.input}
              placeholder="Ex. I'd like to run around the neighborhood for thirty minutes!"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>
          
        <TouchableOpacity
          onPress={() => addToMyDice()}
        >
          <View style={{position: 'absolute', bottom: 30, width: '100%', alignItems: 'center', zIndex: 40}}>
              <View style={[styles.button, isFormFilled ? styles.buttonEnabled : styles.buttonDisabled,]}>
                <Text style={styles.buttonText}>Add to My Dice</Text>
              </View>
          </View>
        </TouchableOpacity>
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
    // minHeight: 550,
    height: "85%",
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    fontFamily: "Poppins-Bold",
  },
  subTitle: {
    marginHorizontal: 12,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Themes.colors.darkGray,
    fontFamily: "Poppins-Regular",
  },
  activityNameContainer: {
    marginBottom: 16,
    height: 80,
    width: "100%",
    gap: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
    height: 150,
    width: "100%",
    gap: 8,
  },
  asterick: {
    color: Themes.colors.salmon,
  },
  button: {
    width: 340,
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonEnabled: {
    backgroundColor: Themes.colors.salmon,
  },
  buttonDisabled: {
    backgroundColor: Themes.colors.salmonTransparent,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
});