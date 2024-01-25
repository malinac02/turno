import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { PostsContext } from "../../contexts/PostsContext";


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
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Feed" />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data !== undefined &&
            data.map(
              (post, index) =>
                post.is_profile_post !== true && (
                  <Post
                    key={index}
                    id={post.id}
                    profilePost={post.is_profile_post}
                    postIndex={index}
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
    height: "14%",
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
  headerFriends: {
    marginTop: 5,
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
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
