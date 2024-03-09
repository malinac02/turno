import { View, StyleSheet, SafeAreaView, FlatList, Animated, ScrollView, Text } from "react-native";
import StatsCard from "../StatsCard"
import { Themes } from "../../assets/Themes";
import { useRef } from "react";
import { useEffect } from "react";
import Post from "../Post.js";
import Images from "../../assets/Themes/Images";

export default function MyPosts({ handle, profilePicUri }) {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Post
        isYourPost={true}
        key={1}
        id={1}
        postIndex={1}
        profilePost={true}
        handle={handle}
        profilePic={profilePicUri}
        hardCode={false}
        activityName={"Go on a run"}
        comments={["Can I join next time?"]}
      />
      <Post
        isYourPost={true}
        key={2}
        id={2}
        postIndex={2}
        profilePost={true}
        handle={handle}
        profilePic={profilePicUri}
        hardCode={false}
        activityName={"Eat at Zareens"}
        comments={["Ooh you gotta have the garlic naan"]}
      />
      <Post
        isYourPost={true}
        key={3}
        id={3}
        postIndex={3}
        profilePost={true}
        handle={handle}
        profilePic={profilePicUri}
        hardCode={false}
        activityName={"Dish hike"}
        comments={["Take me with you!"]}
      />
      <Post
        isYourPost={true}
        key={4}
        id={4}
        postIndex={4}
        profilePost={true}
        handle={handle}
        profilePic={profilePicUri}
        hardCode={false}
        activityName={"Read my book"}
        comments={["How was it?"]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.colors.background,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    height: "16%",
    paddingBottom: 12,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: Themes.colors.salmon,
  },
  banner: {
    paddingHorizontal: 20,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerDice: {
    // borderWidth: 2,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginHorizontal: "auto",
  },
});
