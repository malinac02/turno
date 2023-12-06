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
import { CommentsProvider } from "../contexts/CommentsContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Themes } from "../assets/Themes";

export default function Post({ postId, imageSource, profile, activityName }) {
  const [kudosColor, setKudosColor] = useState("black"); // Initial color

  const toggleKudos = () => {
    setKudosColor((prevColor) => (prevColor === "black" ? "red" : "black"));
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  // PROVISORY

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <CommentsProvider postId={postId}>
      <View style={styles.container}>
        <View style={styles.ImageText}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.profileImg} />
          </View>
          <View style={styles.textContainer}>
            <Link href={{ pathname: "/feed/profileClicked" }}>
              <Text style={styles.postText}>
                {profile}:{" "}
                <Text style={styles.activityNameStyle}>{activityName} </Text>
              </Text>
            </Link>

            <View style={styles.actionItemsContainer}>
              <TouchableOpacity onPress={toggleKudos}>
                <KudosIcon color={kudosColor} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.commentContainer}
                onPress={toggleModal}
              >
                <CommentIcon color="black" />
                <CommentModal
                  isModalVisible={isModalVisible}
                  toggleModal={toggleModal}
                  setModalVisible={setModalVisible}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CommentsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140, // Keep this Standard
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderWidth: 0.3,
    borderColor: Themes.colors.darkGray,
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
  },
  activityNameStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
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
