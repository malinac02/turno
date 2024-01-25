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
} from "react-native";
import Comment from "./Comment.js";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Themes from "../assets/Themes/themes.js";
import { FontAwesome5 } from "@expo/vector-icons";
import { PostsContext } from "../contexts/PostsContext";

export default function CommentModal({
  profilePost,
  id,
  postsTest,
  postIndex,
  isModalVisible,
  toggleModal,
  setModalVisible,
  comments,
}) {
  // const comments = [
  //   ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
  //   ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
  //   // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
  //   // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
  //   // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
  //   // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
  //   // ["@malinac", Images.profileImages.malina, "Great post!!", "black"],
  //   // ["@pcivita", Images.profileImages.pedro, "Awesome!", "black"],
  // ];

  const { addCommentToPost } = useContext(PostsContext);

  const [newComment, setNewComment] = useState("");

  const { posts } = useContext(PostsContext);

  const userHandle = "@pcivita";
  const userName = "Pedro Civita";

  // console.log("POSTs CONTEXT ", posts);
  // console.log("POSTs Test ", postsTest);
  // console.log("POST INDEX", postIndex);

  // const commentsTEST = posts[postIndex].comments;

  const handleAddComment = async () => {
    console.log("Comment Pressed", newComment);
    
  };

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
          <Text style={styles.title}>Comments</Text>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.scrollView}
          >
            <View flex={1} onStartShouldSetResponder={() => true}>
              {comments !== null &&
                comments.map((commentData, index) => {
                  return <Comment key={index} commentData={commentData} />;
                })}
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Themes/Images/profileImages/IMG_9521.jpg")}
                style={styles.profileImg}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
            />
            {newComment && (
              <Pressable onPress={handleAddComment}>
                <View style={styles.sendContainer}>
                  <FontAwesome5 name="arrow-up" size={20} color={"white"} />
                </View>
              </Pressable>
            )}
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
    alignSelf: "flex-end",
    height: 100,
    borderTopWidth: 0.3,
    borderTopColor: "black",

    // paddingHorizontal: 10,
    width: "100%", // Adjust width as needed
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 12,
  },
  input: {
    height: 40,
    flex: 1,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Themes.colors.darkGray,
    paddingHorizontal: 10,
    // width: "90%"
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
  imageContainer: {
    width: "11.5%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  profileImg: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  sendContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 100,
    backgroundColor: Themes.colors.salmon,
  },
});
