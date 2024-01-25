import { View, Text, StyleSheet, Image} from "react-native";
import { Themes } from "../assets/Themes";
import Fire from "./Icons/Fire";
import Kudos from "./Icons/Kudos";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Stats({ index, statContent }) {
  const diceImage = statContent[0];
  const iconType = statContent[1];
  const stat = statContent[2];
  const description1 = statContent[3];
  const description2 = statContent[4];

  let iconComponent = <FontAwesome5 name="dice-five" size={50} color={Themes.colors.salmon} />;
  switch (iconType) {
    case "fire":
      iconComponent = <Fire width={44} height={57} />;
      break;
    case "dice":
      iconComponent = <FontAwesome5 name="dice-two" size={50} color={Themes.colors.salmon} />
      break;
    case "cat":
      iconComponent = <FontAwesome5 name="cat" size={50} color={Themes.colors.salmon} />
      break;
    case "star":
      iconComponent = <FontAwesome5 name="star" size={50} color={Themes.colors.salmon} />
      break;
    case "kudos":
      iconComponent = <Kudos size={50} color={Themes.colors.salmon} />
      break;
    case "celeb":
      iconComponent = <FontAwesome5 name="camera-retro" size={50} color={Themes.colors.salmon} />
      break;
  }

  let additionalStyle;
  switch (index) {
    case 0:
      additionalStyle = styles.firstStatsCard;
      break;
    case 5:
      additionalStyle = styles.lastStatsCard;
      break;
  }

  return (
    <View style={[styles.container, additionalStyle]}>
      <View style={styles.statCard}>
        <Image
          source={diceImage}
          style={styles.diceNumberIcon}
        />
        <View style={styles.circle}>
          {iconComponent}
          <Text style={styles.circleText}>x{stat}</Text>
        </View>
        <Text style={styles.description1}>{description1}</Text>
        <Text style={styles.description2}>{description2}</Text>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    height: 325,
    alignItems: "center"
  },
  statCard: {
    width: 310,
    flex: 1,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "black",
    padding: 8,
    alignItems: "center",
    gap: 10,
    backgroundColor: "white"
  },
  firstStatsCard: {
    marginLeft: 41,
  },
  lastStatsCard: {
    marginRight: 41,
  },
  diceNumberIcon: {
    width: 50,
    height: undefined,
    aspectRatio: 1,
  },
  circle: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: Themes.colors.salmonLight,
    justifyContent: "center",
    alignItems: "center"
  },
  circleText: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold"
  },
  description1: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 10,
    fontFamily: "Poppins-SemiBold"
  },
  description2: {
    fontSize: 14,
    lineHeight: 25,
    textAlign: "center",
    marginTop: -10,
    fontFamily: "Poppins-Regular"
  }
});

