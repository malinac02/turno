import { View, StyleSheet, Text, Image } from "react-native";
import { Themes } from "../assets/Themes";
import Images from "../assets/Themes/Images";

export default function ActvityRollled({ diceNum, activityName }) {
  const icons = [
    Images.diceIcons.one,
    Images.diceIcons.two,
    Images.diceIcons.three,
    Images.diceIcons.four,
    Images.diceIcons.five,
    Images.diceIcons.six,
  ];
  return (
    <View style={styles.activityName}>
      <View style={styles.imageContainer}>
        <Image source={icons[diceNum]} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {" "}{activityName}{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityName: {
    backgroundColor: Themes.colors.blue,
    width: "95%",
    height: 120,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
    borderRadius: 20,
    gap: 12,
    top: -16,
    paddingHorizontal: 12,

    shadowOpacity: 0.3,
    shadowOffset: {
      height: 3,
    },
  },
  imageContainer: {
    width: "20%",
    height: undefined,
    alignSelf: "center",
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontFamily: "Poppins-Bold",
    color: Themes.colors.background,
    fontSize: 24,
  },
});
