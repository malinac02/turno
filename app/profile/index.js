import { StyleSheet, Text, View } from "react-native";
import { Themes } from "../../assets/Themes";
import { Link, Stack } from "expo-router";
import Post from "../../components/Post";
import { useFonts } from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import ProfileCard from "../../components/ProfileCard";
import { useState, useContext, useEffect } from "react";
import { PostsContext, PostsProvider } from "../../contexts/PostsContext";
import Header from "../../components/Header";

export default function Page() {
  const [data, setData] = useState();


  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/Poppins/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <PostsProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Header title="Profile" />
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileCard}>
              <ProfileCard
                isYourProfile={true}
                profileName="Pedro Civita"
                handle="@pcivita"
                profilePic={"Pedro"}
              />
            </View>
            <View style={styles.postTextContainer}>
              <Text style={styles.postText}>Posts</Text>
            </View>
            {data !== undefined &&
              [...data]
                .reverse()
                .map(
                  (post, index) =>
                    post.is_profile_post === true && (
                      <Post
                        isYourPost={true}
                        key={index}
                        id={post.id}
                        postIndex={index}
                        profilePost={post.is_profile_post}
                        handle={post.user_handle}
                        profilePic={post.user_profile_pic}
                        activityName={post.post_text}
                        comments={post.comments}
                      />
                    )
                )}
          </ScrollView>
        </View>
      </View>
    </PostsProvider>
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
  postTextContainer: {
    height: 30,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  postText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
});
