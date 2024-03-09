import { StyleSheet, Text, View } from "react-native";
import { Themes } from "../../assets/Themes";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import ProfileCard from "../../components/ProfileCard";
import { useState, useEffect, useContext } from "react";
import { PostsProvider } from "../../contexts/PostsContext";
import Header from "../../components/Header";
import MyPosts from "../../components/ProgressScreens/MyPosts";
import Stats from "../../components/ProgressScreens/Stats";
import ProfileNavigation from "../../components/ProfileNavigation";
import { UserContext } from "../../contexts/UserContext";

export default function Page() {
  //const [data, setData] = useState();

  const [activeScreen, setActiveScreen] = useState("Posts"); // Initial state

  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    profilePicUri: "",
  });
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUri, setProfilePicUri] = useState("");
  const { fetchUserFromUid, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {

      const fetchUserData = async () => {
        try {
          let result = await fetchUserFromUid(user.uid);
          setFullName(result.fullName);
          setUsername(result.username);
          if (result.profilePicUri) setProfilePicUri(result.profilePicUri);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUserData();
    }
  }, [user]);


  handleData = (data) => {
    setActiveScreen(data);
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/Poppins/Poppins-SemiBold.ttf"),
    // "Poppins-Medium": require("./assets/Poppins/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../../assets/Poppins/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <>
      {userData && (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <Header title="Profile" />

          <View style={styles.profileCard}>
           <ProfileCard
              isYourProfile={true}
              profileName={fullName}
              handle={"@" + username}
              profilePic={profilePicUri}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ProfileNavigation onData={handleData} />
          </View>

          <View style={styles.subscreenContainer}>
            {activeScreen === "Posts" && <MyPosts handle={"@" + username} profilePicUri={profilePicUri} />}
            {activeScreen === "Stats" && <Stats />}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Themes.colors.background,
  },
  subscreenContainer: {
    flex: 1,
    height: 200,
  },
  buttonContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  profileCard: {},
});
