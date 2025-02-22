import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";
import { Profile } from "./Profile"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function DiceCard({ img, title, creator, numSaved, numRolled }) {
  const { fetchUserFromUid, user } = useContext(UserContext);
  const [creatorUsername, setCreatorUsername] = useState();
  const [creatorProfilePic, setCreatorProfilePic] = useState();

  useEffect(() => {
    if (creator) {
      const fetchUserData = async () => {
        try {
          let result = await fetchUserFromUid(creator);
          if (result && result.username) {
            setCreatorUsername(result.username);
          }
          if (result && result.profilePicUri) {
            setCreatorProfilePic(result.profilePicUri);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {img !== "" ? (
          <Image source={{ uri: img }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/Themes/Images/onboarding/diceZigZag2.png")}
            style={styles.diceImage}
          />
        )}
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.row}>
        {creatorProfilePic ? (
          <Image
            source={{ uri: creatorProfilePic }}
            style={styles.profilePic}
          />
        ) : (
          <Profile width={23} height={23}  />
        )}
        <Text style={{ fontSize: 12 }}>By @{creatorUsername}</Text>
      </View>
      <View style={styles.row2}>
        <Image
          style={styles.bookmarkIcon}
          source={require("../assets/Themes/Images/other/bookmarkGrey.png")}
        />
        <Text style={styles.statsText}>{numSaved}</Text>
        <Image
          style={styles.bookmarkIcon}
          source={require("../assets/Themes/Images/other/diceRoll.png")}
        />
        <Text style={styles.statsText}>{numRolled}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - windowWidth * 0.05,
    borderRadius: 20,
    height: 190,
    borderWidth: 1,
    borderColor: Themes.colors.mediumGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    marginLeft: 10,
    gap: 5,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
  },
  imageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Themes.colors.mediumGray,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  diceImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Themes.colors.blue,
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
  profilePic: {
    width: 23,
    height: 23,
    borderRadius: 999,
  },
  statsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginRight: 4,
    color: "#9C9C9C",
  },
  bookmarkIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
});
