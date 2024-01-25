import { StyleSheet, Text, View } from "react-native";
import { Themes } from "../../assets/Themes";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import ProfileCard from "../../components/ProfileCard";
import { useState,  useEffect } from "react";
import { PostsProvider } from "../../contexts/PostsContext";
import Header from "../../components/Header";
import MyPosts from "../../components/ProgressScreens/MyPosts";
import Stats from "../../components/ProgressScreens/Stats";
import ProgressNavigation from "../../components/ProgressNavigation";

export default function Page() {
  //const [data, setData] = useState();

const [activeScreen, setActiveScreen] = useState("Stats"); // Initial state
  handleData = (data) => {
    setActiveScreen(data);
  };

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
      <Header title="Profile" />

      <View style={styles.profileCard}>
        <ProfileCard
          isYourProfile={true}
          profileName="Pedro Civita"
          handle="@pcivita"
          profilePic={"Pedro"}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ProgressNavigation onData={handleData} />
      </View>

      <View style={styles.subscreenContainer}>
        {activeScreen === "Posts" && <MyPosts />}
        {activeScreen === "Stats" && <Stats />}
      </View>
    </View>
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
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  profileCard: {
  }
});
