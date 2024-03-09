import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Images from "../assets/Themes/Images";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PersonalDiceCard({
  item,
  diceName,
  description,
  imageUri,
  community,
  isPopupVisible,
  togglePopup,
  toggleDeleteModal,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Link
          href={{
            pathname: `/roll/MyDiceDetails`,
            params: {
              diceName: item.name,
              description: item.description,
              choices: item.choices,
              numRolled: item.rollHistory,
              numSaved: item.saves,
              img: item.imageUri,
              // id: item.id,
              diceId: item.diceId,
              creator: item.creator,
              headerTitle: "My Dice Details",
            },
          }}
        >
          <View style={styles.content}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require("../assets/Themes/Images/onboarding/diceZigZag2.png")
              }
              style={styles.image}
            />
            <View style={styles.textCol}>
              <View style={styles.titleAndSubtitle}>
                <Text style={styles.titleText} numberOfLines={2}>
                  {diceName}
                </Text>
                <Text style={styles.descText} numberOfLines={1}>
                  {description ? description : " "}
                </Text>
              </View>

              <Link
                href={{
                  pathname: `/roll/roll`,
                  params: item
                    ? {
                        diceName: item.name,
                        choices: item.choices,
                        numRolled: item.rollHistory,
                        numSaved: item.saves,
                        img: item.imageUri,
                        // id: item.id,
                        diceId: item.diceId,
                        creator: item.creator,
                      }
                    : {},
                }}
              >
                <TouchableOpacity style={styles.button}>
                  <FontAwesome5 name="dice-d6" size={16} color="white" />
                  <Text style={[styles.descText, { color: "white" }]}>
                    Roll
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </Link>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.menuDots} onPress={togglePopup}>
          <FontAwesome5 name="ellipsis-h" size={12} color="black" />
        </TouchableOpacity>
      </View>
      {isPopupVisible && (
        <View style={styles.popupMenu}>
          <View style={styles.popupMenuRow}>
            <Link
              href={{
                pathname: `/roll/editDice`,
                params: {
                  diceName: diceName,
                  description: description,
                  choices: JSON.stringify(item.choices),
                  categoryID: item.categoryID,
                  switchEnabled: community,
                  imageUri: imageUri,
                },
              }}
            >
              <TouchableOpacity style={styles.popupMenuItem}>
                <FontAwesome5 name="pencil-alt" size={16} color="black" />
                <Text style={styles.popupText}>Edit</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onPress={togglePopup}
              style={styles.popupExitButton}
            >
              <Text style={styles.popupText}>X</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleDeleteModal}
            style={styles.popupMenuItem}
          >
            <FontAwesome5 name="trash-alt" size={16} color="black" />
            <Text style={styles.popupText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.95,
    height: 140,
    borderWidth: 1,
    borderColor: Themes.colors.mediumGray,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    height: 140,
    flex: 1,
    alignSelf: "center",
    paddingTop: 2.5,
  },
  content: {
    height: 140,
    width: 350,
    padding: 10,
    paddingRight: 0,
    borderRadius: 20,

    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  rightContainer: {
    width: 25,
    paddingTop: 5,
    paddingRight: 5,
  },
  textCol: {
    marginLeft: 5,
    padding: 10,
    paddingRight: 0,
    height: "90%",
    flex: 1,
    justifyContent: "space-between",
    gap: 17,
    overflow: "visible",
  },
  button: {
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Themes.colors.salmon,
    gap: 8,
    borderRadius: 30,
    paddingVertical: 6,
  },
  menuDots: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  image: {
    width: 100,
    height: "90%",
    borderRadius: 10,
    backgroundColor: Themes.colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  titleAndSubtitle: {
    height: 50,
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    width: "90%",
    lineHeight: 18,
  },
  descText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  popupMenu: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    gap: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupMenuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popupMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingRight: 15,
  },
  popupExitButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 15,
  },
  popupText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
