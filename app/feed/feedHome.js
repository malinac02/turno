import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { PostsContext } from "../../contexts/PostsContext";
import FeedSupabase from "../../FeedSupabase";

export default function Page() {
  const [data, setData] = useState();

  // Handling Supabase logic taken from supabase website and CS147L Lecture 13
  const handleRecordUpdated = (payload) => {
    setData((oldData) =>
      oldData.map((item) => (item.id === payload.old.id ? payload.new : item))
    );
  };

  const handleRecordInserted = (payload) => {
    setData((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    setData((oldData) => oldData.filter((item) => item.id !== payload.old.id));
  };

  useEffect(() => {
    const subscription = FeedSupabase.channel("feed-schema")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts_feed" },
        handleRecordUpdated
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts_feed" },
        handleRecordInserted
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts_feed" },
        handleRecordDeleted
      )
      .subscribe();

    // Unsubscribe on cleanup
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FeedSupabase.from("posts_feed").select("*");
        if (response.error) {
          throw response.error;
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  //End of Supabase Logic

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/Poppins/Poppins-SemiBold.ttf"),
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