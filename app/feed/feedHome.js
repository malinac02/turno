import {
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  Modal,
  ScrollView,
} from "react-native";
import { router, Link, Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../../assets/Themes";
import { useState, useEffect, useContext } from "react";
import Activity from "../../components/Activity";
import { useFonts } from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { PostsContext, PostsProvider } from "../../contexts/PostsContext";
import Supabase from "../../Supabase";

export default function Page() {
  const [data, setData] = useState();

  const handleRecordUpdated2 = (payload) => {
    console.log("UDPATE", payload);
    setData((oldData) =>
      oldData.map((item) => {
        if (item.id === payload.old.id) {
          return payload.new;
        } else {
          return item;
        }
      })
    );
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setData((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setData((oldData) => oldData.filter((item) => item.id !== payload.old.id));
  };

  useEffect(() => {
    // Listen for changes to db
    // From https://supabase.com/docs/guides/realtime/concepts#postgres-changes
    Supabase.channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        handleRecordUpdated2
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        handleRecordInserted
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        handleRecordDeleted
      )
      .subscribe();
  }, []);

  useEffect(() => {
    // Fetch data on initial load
    const fetchData = async () => {
      const response = await Supabase.from("posts").select("*");
      setData(response.data);
    };
    fetchData();
  }, []);

  const { posts } = useContext(PostsContext);
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
          {/* <Post
            style={styles.post}
            postId={1}
            profileName="Malina Calarco"
            profilePic={Images.profileImages.malina}
            handle={"@malinac"}
            activityName={"Lake Lag"}
          />
          <Post
            style={styles.post}
            postId={2}
            profileName="L Civita"
            profilePic={Images.profileImages.luca}
            handle={"@lcivita"}
            activityName={"Lake Lag"}
          />
          <Post
            style={styles.post}
            postId={5}
            profileName="Pedro 2"
            profilePic={Images.profileImages.pedro}
            handle={"@pedro"}
            activityName={"Lake Lag"}
          />
          <Post
            style={styles.post}
            postId={3}
            profileName="EVGR Gal"
            profilePic={Images.profileImages.cecilia}
            handle={"@ccevgrb"}
            activityName={"Lake Lag"}
          />
          <Post
            style={styles.post}
            postId={4}
            profileName="Digo"
            profilePic={Images.profileImages.digo}
            handle={"@digo"}
            activityName={"Lake Lag"}
          />
          <Post
            style={styles.post}
            postId={6}
            profileName="Pedro Civita"
            profilePic={Images.profileImages.pedro}
            handle={"@pcivita"}
            activityName={"Lake Lag"}
            isYourPost={true}
          />
          <Post
            style={styles.post}
            postId={7}
            profileName="Naz"
            profilePic={Images.profileImages.naz}
            handle={"@nazzz"}
            activityName={"Lake Lag"}
          /> */}
          {data !== undefined &&
            data.map(
              (post, index) =>
                post.is_profile_post !== true && (
                  <Post
                    key={index}
                    id={post.id}
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
    // borderWidth: 2,
    // borderColor: "blue",
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
    // borderColor: "black",
    // borderWidth: 2,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
