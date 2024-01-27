import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, useNavigation } from "expo-router";
import { Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ title, dice, onPress=null }) {
  let headerTitle = title;
  if (title === "Friends from Feed" || title === "Friends from Profile") {
    headerTitle="Friends";
  }

  console.log(dice);

const titleToPath = {
    "Settings": "/profile",
    "Create Activity": "/activities/home",
    "Friends from Feed": "/feed",
    "Friends from Profile": "/profile",
    "Roll": "/roll",
    "Activities": "/roll",
    "Create New Dice": "/roll",
  };

  const backPath = { pathname: titleToPath[title] || "/" };

  return (
    <View style={styles.container}>
      {(titleToPath[title]) ?
        <View style={styles.leftIcon}>
          <Link href={backPath} onPress={onPress}>
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
          href={ title === "Profile" ? {pathname: "/profile/settings"} : {pathname: "friendsPage", previousPage: "Feed"}} 
          style={styles.rightIcon}
        >
          <FontAwesome5
            name={title === "Profile" ? "cog" : "user-friends"} 
            size={25}
            color={"white"}
          />
        </Link>
      )}
      {(title === "Roll") && (
        <Link 
          href={{ 
            pathname: "/activities", 
            params: {
              diceItem: dice
              // title: dice.title,
              // numRolled: dice.numRolled,
              // numSaved: dice.numSaved,
              // user: dice.user,
              // username: dice.user.username,
              // profilePic: dice.user.profilePic,
              // img: dice.img,
              // id: dice.id,
              // activities: dice.activities,
            }
          }} 
          style={styles.rightIcon}
        >
          <MaterialCommunityIcons
            name={"pencil"}
            size={25}
            color={"white"}
          />
        </Link>
      )}
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
    fontSize: 24,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  rightIcon: {
    position: "absolute",
    right: 15,
    top: 65
  },
});
