import { Text, View, StyleSheet, Image } from "react-native";
import { Themes } from "../../assets/Themes";
import DiceComponent from "../DiceComponent";
import { FontAwesome5 } from "@expo/vector-icons";
import Images from "../../assets/Themes/Images";
import { useContext, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import Header from "../Header";
import { ActivitiesContext } from "../../contexts/ActivitiesContext";
import { Link } from "expo-router";

export default function RollDice({ onData, canRoll, diceRolled }) {
  const [appearHeader, setAppearHeader] = useState(false);
  const handleData = (data) => {
    // Process the data
    onData(data);
    setAppearHeader(true);
    headerBounce();
    swipeBounce();
    //setActiveScreen("CompleteDice"); TODO IMPORTANT
  };
  const headerBounce = () => {
    progress.value = withSpring(130);
  };
  const swipeBounce = () => {
    progress2.value = withSpring(130);
  };

  const progress = useSharedValue(0);
  const progress2 = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value }],
    };
  }, []);

  const { activities } = useContext(ActivitiesContext);

  return (
    <View style={styles.screenContainer}>
      <Header title="Roll" />
      {canRoll ? (
        <View>
          <View styles={styles.upperTextContainer}>
            <Text style={styles.upperText}>
              {" "}
              Roll the dice for an Activity!{" "}
            </Text>
          </View>
          <DiceComponent style={styles.Dice} onData={handleData} isRollable={!diceRolled} />
        </View>
      ) : (
        <View style={styles.msg}>
          <View>
            <Text style={styles.upperText}>
              Add at least one more activity to get started!
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={Images.diceIcons.faded} style={styles.diceImage} />
          </View>
          <View style={styles.takeMeThere}>
            <Link href={"/activities/createActivity"}>
              <Text style={styles.takeMeText}>Create an Activity</Text>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
    width: "80%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  diceImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  msg: {
    gap: 50,
    zIndex: 10,
  },
  takeMeText: {
    color: Themes.colors.background,
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  takeMeThere: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Themes.colors.blue,

    shadowOpacity: 0.3,
    shadowOffset: { height: 2 },
  },

  screenContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: Themes.colors.background,
    gap: 30,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    height: 110,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "space-around",
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
  title: {
    fontSize: 32,
    color: "white",
    fontFamily: "Poppins-Bold",
  },

  upperTextContainer: {
    width: "100%",

    borderWidth: 5,
  },
  upperText: {
    color: "black",
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    zIndex: -100,
  },
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
