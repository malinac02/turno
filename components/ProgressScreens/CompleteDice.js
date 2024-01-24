import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SwipeButton from "../SwipeButton";
import Journey from "./Journey";
import { Themes } from "../../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import DiceComponent from "../DiceComponent";
import { useState } from "react";
import ActivityCircle from "../ActivityCircle";
import CongratsModal from "../CongratsModal";
import ActivityRolled from "../ActivityRolled";
import Fire from "../Icons/Fire";
import Header from "../Header"

export default function CompleteDice({
  setActiveScreen,
  setAppearHeader,
  activityName,
  activityIndex,
}) {
  const [swipeComplete, setSwipeComplete] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onToggle = () => {
    setSwipeComplete(!swipeComplete);
    setModalVisible(!swipeComplete);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.banner}>
          <View style={styles.iconsContainer}>
            <FontAwesome5
              name="dice-five"
              size={25}
              color={Themes.colors.salmon}
              transform={[{ rotate: "45deg" }]}
            />
            <Text style={styles.iconText}>x34</Text>
          </View>
          <View style={styles.iconsContainer}>
            <Fire width={25} height={30} />
            <Text style={styles.iconText}>x10</Text>
          </View>
        </View>
      </View> */}
      <Header title="Roll" />

      {/* <View style={[styles.square]}>
        <ActivityRolled />
      </View> */}

      {/* <Journey flipping={true} /> */}

      <View style={styles.buttonContainer}>
        <SwipeButton onToggle={onToggle} style={styles.swipeButton} />
      </View>

      <CongratsModal
        activityName={activityName}
        activityIndex={activityIndex}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        switchEnabled={switchEnabled}
        setSwitchEnabled={setSwitchEnabled}
        setActiveScreen={setActiveScreen}
        setAppearHeader={setAppearHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: Themes.colors.blue,
    borderRadius: 20,
    height: 60,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    top: 630,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: Themes.colors.background,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    height: "15%",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: Themes.colors.background,
  },
  banner: {
    paddingHorizontal: 20,
    marginBottom: 10,
    // borderWidth: 2,
    // borderColor: "blue",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerDice: {
    // borderWidth: 2,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  subscreenContainer: {
    flex: 1,
    // borderWidth: 2,
    position: "relative",
    width: "100%",
    height: "100%",
    // backgroundColor: "black"
  },
  square: {
    color: "red",
    width: "100%",
    height: 100,
    position: "absolute",
    top: 130,
    right: 0,
    zIndex: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  iconText: {
    fontFamily: "Poppins-Bold",
  },
});
