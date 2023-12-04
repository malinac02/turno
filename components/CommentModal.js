import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  SectionList,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { CommentsContext } from "../contexts/CommentsContext";
import Comment from "./Comment.js"
// import { Themes } from "../assets/Themes";

export default function CommentModal({ isVisible, closeModal, postId }) {
  const { getComments } = useContext(CommentsContext);
  const comments = getComments(postId);

  const handlePressOutside = (e) => {
    // Check if the click is outside the modal
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.container}>
      <View style={styles.modal}>
      <Text>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(comment, index) => comment + index}
        renderItem={({ item, index }) => (
          <Comment comment={"my comment"} />
        )}
        style={styles.commentsList}
      />
      </View>
      {/* <TouchableWithoutFeedback onPress={(e) => handlePressOutside(e)} >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text>Comment Modal</Text>
            <FlatList
              data={comments}
              keyExtractor={(comment, index) => comment + index}
              renderItem={({ item, index }) => (
                <Comment comment={"my comment"} />
              )}
              style={styles.commentsList}
            >
            </FlatList>
          </View>
        </View>
      </TouchableWithoutFeedback> */}
      </View>
    </Modal>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    height: "70%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    position: "absolute",
    top: "auto", // Reset the top position
    bottom: 0, // Position at the bottom
    overflow: "hidden",
  },
  commentsList: {
    backgroundColor: "green",
    width: "95%",
    flex: 1,
  },
  comment: {
    backgroundColor: "white",
  }
});