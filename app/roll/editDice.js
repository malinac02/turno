import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Themes } from "../../assets/Themes";
import Category from "../../components/Category";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DiceContext } from "../../contexts/DiceContext";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export default function Page() {
  const params = useLocalSearchParams();

  const [diceName, setDiceName] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState([null]);
  const [categoryID, setCategoryID] = useState(null);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const [isFormFilled, setIsFormFilled] = useState(false);
  const { user, addDiceToUser } = useContext(UserContext);

  const { initializeDiceDatabaseEntry } = useContext(DiceContext);

  useEffect(() => {
    if (params) {
      setDiceName(params.diceName);
      setDescription(params.description);
      try {
        const choices = JSON.parse(params.choices);
        if (Array.isArray(choices)) {
          if (choices.length < 6) {
            choices.push(null);
          }
          setChoices(choices);
        }
      } catch (e) {
        console.error("Error: ", e);
      }
      console.log("category id: ", params.categoryID)
      setCategoryID(params.categoryID);
      setSwitchEnabled(params.switchEnabled);
      setImageUri(params.imageUri);
    }
  }, [params]);

  const categories = [
    ["Exercise", "running"],
    ["Work", "briefcase"],
    ["Academic", "graduation-cap"],
    ["Relax", "cat"],
    ["Social", "user-friends"],
    ["Food & Drink", "utensils"],
  ];

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

  const addToChoices = (name) => {
    const newChoices = [name, ...choices];

    if (newChoices.length === 7) {
      newChoices.pop();
    }
    setChoices(newChoices);
    setIsFormFilled(diceName.trim().length > 0 && categoryID !== null);
  };

  const uploadImage = async (imageFile, diceId) => {
    if (!user) return;
    try {
      const response = await fetch(imageFile);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${diceId}`);
      await uploadBytesResumable(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleSaveDice = async () => {
    // TODO: handle save in front & backend

    // let downloadUrl;
    // if (imageUri) {
    //   downloadUrl = await uploadImage(imageUri, diceId);
    // }
    // const filteredChoices = choices.filter((choice) => choice !== null);

    // const newDice = {
    //   diceId: diceId,
    //   name: diceName,
    //   description,
    //   choices: filteredChoices,
    //   categoryID,
    //   creator: user.uid,
    //   community: switchEnabled,
    //   imageUri: downloadUrl,
    // };

    // initializeDiceDatabaseEntry(newDice);
    // addDiceToUser(user.uid, newDice.diceId);
    // resetState();
  };

  const resetState = () => {
    setDiceName("");
    setDescription("");
    setChoices([null]);
    setCategoryID(null);
    setImageUri(null);
    setSwitchEnabled(false);
    setIsFormFilled(false);
  };

  useEffect(() => {
    setIsFormFilled(
      diceName.trim().length > 0 && categoryID !== null && choices.length > 1
    );
  }, [diceName]);

  const handleCategorySelect = (id) => {
    setCategoryID(id);
    setIsFormFilled(diceName.trim().length > 0 && choices.length > 1);
  };

  // Image picking functions

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    // console.log(result);
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const deleteImage = async () => {
    setImageUri(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Edit Dice" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.diceNameContainer}>
            <Text style={styles.sectionTitle}>
              Dice Name <Text style={styles.asterick}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Dice Name"
              value={diceName}
              onChangeText={setDiceName}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.choicesContainer}>
            <Text style={styles.sectionTitle}>
              Choices <Text style={styles.asterick}>*</Text>
            </Text>
            <Text style={styles.sectionSubtitle}>
              Add up to 6 choices, each representing a face of the dice!
            </Text>
            {choicesPairs.map((pair, index) => (
              <View key={index} style={styles.choicesRow}>
                {pair.map((choice, index) => (
                  <Activity
                    key={index}
                    activityObject={choice}
                    index={index + 1}
                    addToChoices={addToChoices}
                    // handleAddChoice={handleAddChoice}
                  />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>
              Category <Text style={styles.asterick}>*</Text>
            </Text>
            <View style={styles.categories}>
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <Category
                  key={id}
                  id={id}
                  isSelected={id === categoryID}
                  onSelect={handleCategorySelect}
                  categoryName={categories[id - 1][0]}
                  iconName={categories[id - 1][1]}
                />
              ))}
            </View>
          </View>
          <View style={styles.diceBannerContainer}>
            <Text style={styles.sectionTitle}>Dice Banner</Text>
            {imageUri ? (
              <View style={styles.diceBannerUpload} onPress={pickImage}>
                <TouchableOpacity
                  style={styles.deleteImageWrapper}
                  onPress={deleteImage}
                >
                  <MaterialCommunityIcons
                    name="plus-circle"
                    size={28}
                    color={Themes.colors.salmon}
                    style={styles.deleteImageIcon}
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.diceBannerImage}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.diceBannerUpload}
                onPress={pickImage}
              >
                <FontAwesome5
                  name="camera"
                  size={24}
                  color={Themes.colors.darkGray}
                />
                <Text style={styles.diceBannerUploadText}>Upload an image</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.postDiceText}>Post dice to the community</Text>
            <Switch
              trackColor={{ true: Themes.colors.salmon }}
              thumbColor={"white"}
              ios_backgroundColor={Themes.colors.mediumGray}
              onValueChange={() => setSwitchEnabled(!switchEnabled)}
              value={switchEnabled}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Link
            disabled={!isFormFilled}
            href={{
              pathname: "/roll",
            }}
            onPress={handleSaveDice}
          >
            <View
              style={[
                styles.button,
                isFormFilled ? styles.buttonEnabled : styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>Save Dice</Text>
            </View>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: Themes.colors.background,
  },
  scrollContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    backgroundColor: Themes.colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  sectionSubtitle: {
    fontSize: 12, // TODO: make text thin or bigger but keep as 1 line?
    fontFamily: "Poppins-Regular",
  },
  postDiceText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Themes.colors.darkGray,
    height: 45,
    fontFamily: "Poppins-Regular",
  },
  diceNameContainer: {
    height: 75,
    width: "95%",
    gap: 5,
  },
  descriptionContainer: {
    height: 75,
    width: "95%",
    gap: 5,
  },
  choicesContainer: {
    width: "95%",
    gap: 5,
  },
  choicesRow: {
    alignSelf: "center",
    width: "97.5%",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoriesContainer: {
    width: "95%",
    height: 125,
    gap: 5,
  },
  categories: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  diceBannerContainer: {
    // height: 110,
    width: "95%",
    gap: 5,
  },
  diceBannerUpload: {
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Themes.colors.darkGray,
    height: 90,
    fontFamily: "Poppins-Regular",
    alignItems: "center",
    justifyContent: "center",
  },
  diceBannerImage: {
    width: "70%",
    height: "100%",
  },
  diceBannerUploadText: {
    color: Themes.colors.darkGray,
    fontFamily: "Poppins-Regular",
  },
  switchContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Themes.colors.mediumGray,
    height: 60,
    width: "100%",
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "95%",
    height: 60,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
    width: 360,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonEnabled: {
    backgroundColor: Themes.colors.salmon,
  },
  buttonDisabled: {
    backgroundColor: Themes.colors.salmonTransparent,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  asterick: {
    color: Themes.colors.salmon,
  },
  deleteImageWrapper: {
    backgroundColor: "white",
    height: 25,
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // Position the icon absolutely
    top: 0, // Adjust the top and right as needed to position the icon
    right: 45,
    zIndex: 1, // Ensure the icon is above the image
  },
  deleteImageIcon: {
    transform: [{ rotate: "45deg" }],
    bottom: 2,
    left: 0.5,
  },
});
