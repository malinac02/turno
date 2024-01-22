import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, useNavigation } from "expo-router";
import { Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ title }) {
  let headerTitle = title;
  if (title === "Friends from Feed" || title === "Friends from Profile") {
    headerTitle="Friends";
  }

  let backPath;
  switch (title) {
    case "Settings":
      backPath = {pathname: "/profile"};
      break;
    case "Create Activity":
      backPath = {pathname: "/activities/home"};
      break;
    case "Friends from Feed":
      backPath = {pathname: "/feed"};
      break;
    case "Friends from Profile":
      backPath = {pathname: "/profile"};
      break;
  }

  return (
    <View style={styles.container}>
      {(title === "Settings" || title === "Create Activity" || 
      title === "Friends from Feed" || title === "Friends from Profile") ?
        <View style={styles.leftIcon}>
          <Link href={backPath}>
            <FontAwesome5
              name="arrow-left"
              size={25}
              color={"white"}
            />
          </Link>
        </View>
      :
        <FontAwesome5
          name="dice-five" 
          size={25}
          color={"white"}
          transform={[{ rotate: "45deg" }]}
          style={styles.leftIcon}
        />
      }
      <Text style={styles.title}>{headerTitle}</Text>
      {(title === "Profile" || title === "Feed") && (
        <Link 
          href={title === "Profile" ? {pathname: "/profile/settings"} : {pathname: "friendsPage", previousPage: "Feed"}} 
          style={styles.rightIcon}
        >
          <FontAwesome5
            name={title === "Profile" ? "cog" : "user-friends"} 
            size={25}
            color={"white"}
          />
        </Link>
      )}
      {/* {(title === "Roll") && (
        <Link 
          href={{pathname: "friendsPage", previousPage: "Feed"}}
          style={styles.rightIcon}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={25}
            color="white"
          />
        </Link>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 110,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Themes.colors.salmon,
  },
  leftIcon: {
    position: "absolute",
    left: 15,
    top: 65,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  rightIcon: {
    position: "absolute",
    right: 15,
    top: 65
  },
});
