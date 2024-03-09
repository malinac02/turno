import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, useNavigation } from "expo-router";
import { Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ title, dice }) {
  let headerTitle = title;
  if (title === "Friends from Feed" || title === "Friends from Profile") {
    headerTitle = "Friends";
  }
  if (title === "My Dice Details" || title === "Community Dice Details") {
    headerTitle = "Dice Details";
  }

  const navBarTitles = ["My Dice", "Feed", "Community Dice", "Profile"];

  const backArrow = {
    "Settings": "/profile",
    "Create Activity": "/activities/home",
    "Friends from Feed": "/feed",
    "Friends from Profile": "/profile",
    "Roll": "/roll",
    "Activities": "/roll",
    "Create New Dice": "/roll",
    "Edit Dice": "/roll",
    "My Dice Details": "/roll",
    "Community Dice Details": "/browse"
  };

  const backPath = { pathname: backArrow[title] || "/" };

  return (
    <View style={styles.container}>
      {backArrow[title] && (
        <View style={styles.leftIcon}>
          <Link href={backPath}>
            <FontAwesome5 name="arrow-left" size={25} color={"black"} />
          </Link>
        </View>
      )}

      {navBarTitles.includes(title) ? (
        <View style={styles.containerStyle1}>
          <Text style={styles.title}>{headerTitle}</Text>
        </View>
      ) : (
        <Text style={styles.title2}>{headerTitle}</Text>
      )}

      {(title === "Profile" || title === "Feed") && (
        <Link
          href={
            title === "Profile"
              ? { pathname: "/profile/settings" }
              : { pathname: "friendsPage", previousPage: "Feed" }
          }
          style={styles.rightIcon}
        >
          <FontAwesome5
            name={title === "Profile" ? "cog" : "user-friends"}
            size={25}
            color={"black"}
          />
        </Link>
      )}

      {(title === "Roll") && (
        <FontAwesome5
          name={"question-circle"}
          size={25}
          color={"black"}
          style={styles.rightIcon}
        />
      )}

      {/* {title === "My Dice Details" && (
       <MaterialCommunityIcons name={"pencil"} size={25} color={"black"} style={styles.rightIcon}/>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    height: 100,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerStyle1: {
    width: "100%",
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  leftIcon: {
    position: "absolute",
    left: 15,
    top: 60,
  },
  title: {
    fontSize: 26,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  title2: {
    fontSize: 20,
    color: "black",
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  rightIcon: {
    position: "absolute",
    right: 15,
    top: 60,
  },
});
