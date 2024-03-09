import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { router, Stack, useLocalSearchParams, Link } from "expo-router";
import Header from "../../components/Header";
import { Themes } from "../../assets/Themes";
import Activity from "../../components/Activity";
import { UserContext } from "../../contexts/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function MyDiceDetails() {
  const params = useLocalSearchParams();
  const { fetchUserFromUid, user } = useContext(UserContext);

  const [currentDice, setCurrentDice] = useState(null);
  const [choices, setChoices] = useState([]);
  const [creatorUsername, setCreatorUsername] = useState("");
  const [creatorProfilePic, setCreatorProfilePic] = useState();
  const [headerTitle, setHeaderTitle] = useState("");

  // const handleAdd = () => {
  //   router.replace("/roll/roll");
  // };

  useEffect(() => {
    if (params) {
      const arr = params.choices.split(",");
      setChoices(arr);

      setHeaderTitle(params.headerTitle);

      if (params.creator) {
        const fetchUserData = async () => {
          try {
            let result = await fetchUserFromUid(params.creator);
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
    }
  }, [params]);

  const chunkChoices = (choices, size) => {
    return choices.reduce((acc, curr, i) => {
      if (!(i % size)) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    }, []);
  };

  const choicesPairs = chunkChoices(choices, 2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={headerTitle} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{params.diceName}</Text>
        <Link
          href={{
            pathname: `/roll/editDice`,
            params: {
              diceName: params.diceName,
              description: params.description,
              choices: JSON.stringify(choices),
              categoryID: 1, // TODO: change
              switchEnabled: false, // TODO: change 
              // imageUri: imageUri, // TODO
            },
          }}
        >
          <MaterialCommunityIcons name={"pencil"} size={25} color={"black"} style={styles.rightIcon}/>
        </Link>
      </View>

      <View style={styles.descriptionContainer}>
        {params.description &&
          <Text style={styles.descriptionText}>{params.description}</Text>
        }
      </View>

      <View style={styles.creatorAndCategory}>
        <View style={styles.creatorContainer}>
          <View style={styles.profile}>
            <Image
              source={{ uri: creatorProfilePic }}
              style={styles.profilePic}
            />
            <Text style={styles.profileText}>By @{creatorUsername}</Text>
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.profileText}>Food & Drink</Text>
        </View>
      </View>

      <ScrollView style={styles.listContentContainer}>
        {choicesPairs.map((pair, index) => (
          <View key={index} style={styles.choicesRow}>
            {pair.map((activity, idx) => (
              <Activity
                key={idx}
                activityObject={activity}
                index={idx + 1 + index * 2}
                notMyDice={true} // make noninteractive
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Link
          href={{
            pathname: "/roll/roll",
            params: params && {
              diceName: params.diceName,
              choices: params.choices,
              numRolled: params.numRolled,
              numSaved: params.numSaved,
              img: params.img,
              diceId: params.diceId,
              creator: params.creator,
            },
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Roll Dice</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.colors.background,
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  descriptionContainer: {
    width: "90%",
    flexDirection: "column",
    alignItems: "left",
  },
  creatorAndCategory: {
    marginVertical: 10,
    width: "90%",
    // height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    borderColor: Themes.colors.salmon,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Themes.colors.salmon,
    width: 340,
    marginTop: 12,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "white",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 24,
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    // alignItems: "center",
    // textAlign: "center",
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    // alignItems: "center",
    // textAlign: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  boxText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    marginTop: 10,
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  activityBox: {
    alignItems: "center",
    width: 140,
    height: 140,
    backgroundColor: Themes.colors.salmonLight,
    borderRadius: 5,
    padding: 16,
    margin: 8, // added space between elements
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 999,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listContentContainer: {
    // justifyContent: 'center', // centers the items in FlatList
    // alignItems: 'center',

    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: "space-between",
    // gap: 100,
  },

  choicesRow: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityWrapper: {
    width: "50%",
  },
});
