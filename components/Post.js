import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Images from "../assets/Themes/Images";
import { useFonts } from "expo-font";
import KudosIcon from "./Icons/Kudos";
import CommentIcon from "./Icons/Comment";
import CommentModal from "./CommentModal";
import { Link } from "expo-router";
import { useState, useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import { Themes } from "../assets/Themes";
import { Profile } from "./Profile";

export default function Post({
  profilePost,
  id,
  posts,
  postIndex,
  profileName,
  handle,
  profilePic,
  activityName,
  isYourPost,
  comments,
  hardCode,
}) {
  const [kudosColor, setKudosColor] = useState("black"); // Initial color
  const toggleKudos = () => {
    setKudosColor((prevColor) =>
      prevColor === "black" ? Themes.colors.salmon : "black"
    );
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  // PROVISORY

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const imageDict = {
    Pedro: require("../assets/Themes/Images/profileImages/IMG_9521.jpg"),
    Malina: require("../assets/Themes/Images/profileImages/Malina.jpg"),
    Naz: require("../assets/Themes/Images/profileImages/Naz.heic"),
    Cecilia: require("../assets/Themes/Images/profileImages/Cecilia.jpg"),
    Matt: require("../assets/Themes/Images/profileImages/Matt.jpg"),
    Digo: require("../assets/Themes/Images/profileImages/Digo.jpeg"),
    Luca: require("../assets/Themes/Images/profileImages/Luca.jpeg"),
  };

  // source={require("../assets/Themes/Images/profileImages/Malina.jpg")}
  return (
    <View style={styles.container}>
      <View style={styles.ImageText}>
        <View style={styles.imageContainer}>
          {hardCode &&
            <Image source={imageDict[profilePic]} style={styles.profileImg} />
          }
          {(!hardCode && profilePic) &&
            <Image source={{ uri: profilePic }} style={styles.profileImg} />
          }
          {(!hardCode && !profilePic) &&
            <Image source={imageDict.Pedro} style={styles.profileImg} />
          }
        </View>
        <View style={styles.textContainer}>
          {isYourPost ? (
            <Text style={styles.postText}>
              {handle}:
              <Text style={styles.activityNameStyle}>
                {" " + activityName}{" "}
              </Text>
            </Text>
          ) : (
            <Text style={styles.postText}>
              <Link
                href={{
                  pathname: "/friendProfile",
                  params: {
                    profileName: profileName,
                    handle: handle,
                    profilePic: profilePic,
                  },
                }}
              >
                {handle}:
              </Link>
              <Text style={styles.activityNameStyle}>
                {" "}
                {" " + activityName}{" "}
              </Text>
            </Text>
          )}
          <View style={styles.actionItemsContainer}>
            <TouchableOpacity onPress={toggleKudos}>
              <KudosIcon color={kudosColor} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentContainer}
              onPress={toggleModal}
            >
              <CommentIcon color="black" />
              <CommentModal
                profilePost={profilePost}
                id={id}
                postsTest={posts}
                postIndex={postIndex}
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                setModalVisible={setModalVisible}
                comments={comments}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130, // Keep this Standard
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderWidth: 0.3,
    borderColor: Themes.colors.darkGray,
    borderTopColor: Themes.colors.background
  },
  ImageText: {
    gap: 16,
    flexDirection: "row",
  },
  imageContainer: {
    width: "15%",
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
  postText: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: Themes.colors.salmon,
  },
  activityNameStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "black",
  },
  textContainer: {
    gap: 16,
    width: "80%",
    // borderWidth: 1,
  },
  actionItemsContainer: {
    // borderWidth: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 12,
  },
  commentContainer: {
    marginTop: 3,
  },
});

// const styles = StyleSheet.create({
//   flexView: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   modal: {
//     justifyContent: "flex-end",
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: "#161616",
//     paddingTop: 12,
//     paddingHorizontal: 12,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     minHeight: 400,
//     paddingBottom: 20,
//   },
//   center: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   barIcon: {
//     width: 60,
//     height: 5,
//     backgroundColor: "#bbb",
//     borderRadius: 3,
//   },
//   text: {
//     color: "#bbb",
//     fontSize: 24,
//     marginTop: 100,
//   },
//   btnContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 500,
//   },
// });
