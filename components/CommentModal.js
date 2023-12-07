import Modal from "react-native-modal";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { CommentsContext } from "../contexts/CommentsContext.js";
import Comment from "./Comment.js";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default function CommentModal({
  isModalVisible,
  toggleModal,
  setModalVisible,
}) {
  const comments = [
    ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
    ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
    // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
    // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
    // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
    // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
    // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
    // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
  ];

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    // Add logic to handle the addition of a new comment
    console.log("New Comment:", newComment);
    // You can update your state or context with the new comment
    setNewComment("");
  };

  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={isModalVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      avoidKeyboard
      propagateSwipe={true}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.center}>
          <View style={styles.barIcon} />
          <Text style={styles.title}>Comments</Text>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.scrollView}
          >
            <View flex={1} onStartShouldSetResponder={() => true}>
              {comments.map((commentData, index) => (
                <Comment key={index} commentData={commentData} toggleModal={toggleModal} />
              ))}
            </View>
          </ScrollView>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text>Add Comment</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
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
    height: 790,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  commentsList: {
    height: "100%",
    backgroundColor: "green",
  },
  scrollView: {
    width: "95%",
    // backgroundColor: "green",
  },
  inputContainer: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 150,
    paddingHorizontal: 10,
    width: "100%", // Adjust width as needed
    alignSelf: "center", // Center the TextInput
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
