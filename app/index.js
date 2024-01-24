import React, { useState, useContext } from "react";
import { StyleSheet, View, Easing, Text } from "react-native";
import { Themes } from "../assets/Themes";
import { Stack } from "expo-router";
import { ActivitiesContext } from "../contexts/ActivitiesContext";
import RollDice from "../components/ProgressScreens/RollDice";
import CompleteDice from "../components/ProgressScreens/CompleteDice";
import ActivityRolled from "../components/ActivityRolled";
import { InProgressContext } from "../contexts/InProgressContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { CommentsProvider } from "../contexts/CommentsContext";
import { InProgressProvider } from "../contexts/InProgressContext";
import SwipeButton from "../components/SwipeButton";


export default function Page() {
  const { activities, canRoll } = useContext(ActivitiesContext);

  const [appearHeader, setAppearHeader] = useState(false);
  const progress1 = useSharedValue(1);
  const rStyle = useAnimatedStyle(() => {
    return {
      // opacity: progress1.value,
    };
  }, []);

  const { flipProgress } = useContext(InProgressContext);
  const [activeScreen, setActiveScreen] = useState("RollDice");
  const [diceNum, setDiceNum] = useState(-1);
  const [activityName, setActivityName] = useState("");
  const startAnimation = () => {
    // Wait for 1.5 seconds (1500 milliseconds) before starting the animation
    setTimeout(() => {
      progress1.value = withTiming(
        0,
        {
          duration: 500, // Animation duration
        },
        (isFinished) => {
          runOnJS(setActiveScreen)("CompleteDice");
          if (isFinished) {
            progress1.value = withTiming(1, {
              duration: 1000, // Animation duration
            });
            runOnJS(flipProgress)(); //Sets Activity in Progress
          }
        }
      );
    }, 1500);
  };

  const headerBounce = () => {
    progress.value = withSpring(130);
  };

  const progress = useSharedValue(0);

  const rStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value }],
    };
  }, []);

  const handleData = (data) => {
    console.log(data);
    setDiceNum(data[0]);
    setActivityName(data[1][0]);
    setAppearHeader(true);
    startAnimation();
    headerBounce();
  };

  //TODO: Dice shouldn't be clickable after rolling
  return (
    <InProgressProvider>
      {appearHeader && (
        <Animated.View style={[styles.square, rStyle2]}>
          <ActivityRolled diceNum={diceNum} activityName={activityName} />
        </Animated.View>
      )}
      <Animated.View style={[styles.container, rStyle]}>
        <RollDice onData={handleData} canRoll={canRoll} diceRolled={appearHeader} />
      </Animated.View>


      {appearHeader && (
        <Animated.View style={styles.buttonContainer}>
          <SwipeButton style={styles.swipeButton} />
        </Animated.View>
      )}
    </InProgressProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // height: "100%",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flex: 1,
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
  headerDice: {
    // borderWidth: 2,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: Themes.colors.background,
  },
  subscreenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  competeDice: {},
  square: {
    color: "red",
    width: "100%",
    height: 100,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
});
