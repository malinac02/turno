import { Link, router } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Themes } from "../assets/Themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ProfileCard from "../components/ProfileCard";
import { Profile } from "../components/Profile";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../contexts/UserContext";
import { ActivityIndicator } from "react-native-paper";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState("onboarding");
  const [profilePicUri, setProfilePicUri] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fullName, setFullName] = useState("");

  const [onboardingScreenNumber, setOnboardingScreenNumber] = useState(0);
  const flatListRef = useRef(null);

  const ONBOARDING_SCREENS = [
    {
      title: "Create your custom dice",
      description:
        "Whether it’s deciding what to eat, which run to go on, or how to unwind, customize the dice with tailored choices to fit your life.",
    },
    {
      title: "Roll your dice to make decision-making fun",
      description:
        "No more endless pondering or decision fatigue throughout the day.",
    },
    {
      title: "Explore community dice to find new things to do",
      description:
        "Discover a wide range of activities in your area and see what’s popular around you.",
    },
    {
      title: "Celebrate all the choices being made",
      description:
        "Engage with your friends on Turno to learn about their lives.",
    },
  ];

  // const ONBOARDING_SCREENS = [
  //   {header: "Create your custom dice", description: "Whether it’s deciding what to eat, which run to go on, or how to unwind, customize the dice with tailored choices to fit your life."},
  //   {header: "Roll your dice to make decision-making fun", description: "No more endless pondering or decision fatigue throughout the day."},
  //   {header: "Explore community dice to find new things to do.", description: "Discover a wide range of activities in your area and see what’s popular around you."},
  //   {header: "Celebrate all the choices being made", description: "Engage with your friends on Turno to learn about their lives."}
  // ]

  const DOTS = [1, 2, 3, 4];

  const renderOnboardingImage = () => {
    switch (onboardingScreenNumber) {
      case 0:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/diceZigZag.png")}
            style={{
              width: windowWidth,
              resizeMode: "contain",
            }}
          />
        );
      case 1:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/campusLunchSpots.png")}
            style={{
              width: windowWidth,
              resizeMode: "contain",
            }}
          />
        );
      case 2:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/diceShake.png")}
            style={{
              width: windowWidth * 0.8,
              resizeMode: "contain",
            }}
          />
        );
      case 3:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/browsePreview.png")}
            style={{
              width: windowWidth * 0.8,
              resizeMode: "contain",
            }}
          />
        );
      case 4:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/feedPreview.png")}
            style={{
              width: windowWidth * 0.8,
              resizeMode: "contain",
            }}
          />
        );
      default:
        return (
          <Image
            source={require("../assets/Themes/Images/onboarding/diceZigZag.png")}
            style={{
              width: windowWidth,
              resizeMode: "contain",
            }}
          />
        );
    }
  };

  const { user, logIn, logoutUser, signUp, initializeUserDatabaseEntry } =
    useContext(UserContext);
  useEffect(() => {
    if (user) {
      router.replace("/roll");
    }
  }, [user]);

  const handleLogIn = () => {
    logIn(email, password);
  };

  const uploadImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Check the size of the image
      if (blob.size > 32000000) {
        // 32 MB limit
        Alert.alert(
          "Image size exceeds the maximum limit of 32 MB. Please select another image."
        );
        // Optionally, compress the image or inform the user
        return null;
      }

      const uniqueFileName = `${Date.now()}_${Math.floor(
        Math.random() * 10000
      )}`;
      const fileName = `profile_pictures/${uniqueFileName}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      // Handle the error appropriately
      return null;
    }
  };

  //import poppins
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const handleSignUp = async () => {
    setLoading(true);
    if (email && password) {
      try {
        const user = await signUp(email, password);
        if (user) {
          await initializeUserDatabaseEntry(
            email,
            downloadUrl,
            user.uid,
            username,
            fullName
          );

          setEmail("");
          setPassword("");
          setUsername("");
          setProfilePicUri(null);

          setCurrentScreen("onboarding");
        }
      } catch (error) {
        console.error("Error in sign-up process: ", error);
        // Handle the error appropriately here (e.g., show a message to the user)
      }
    }
    setLoading(false);
  };

  const renderOnboarding = () => {
    return (
      <View style={styles.container}>
        <View style={styles.onboardingSpacing} />
        {onboardingScreenNumber !== 0 && (
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              fontFamily: "Poppins-Bold",
              color: "white",
              marginBottom: 24,
            }}
          >
            turno
          </Text>
        )}
        {renderOnboardingImage()}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            alignItems: "center",
            width: windowWidth,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: windowHeight * 0.45,
            paddingBottom: 10,
          }}
        >
          {onboardingScreenNumber === 0 ? (
            <View style={styles.firstScreenContainer}>
              <Text style={styles.title}>turno</Text>
              <Text style={styles.subtitle}>
                Get rolling on making hard decisions
              </Text>
              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 60 }]}
                // style={{
                //   backgroundColor: Themes.colors.salmon,
                //   padding: 12,
                //   borderRadius: 999,
                //   width: windowWidth * 0.8,
                //   alignItems: "center",
                //   marginTop: 48,
                //   marginBottom: 36,
                // }}
                onPress={() =>
                  setOnboardingScreenNumber(onboardingScreenNumber + 1)
                }
              >
                <Text style={styles.onBoardingButtonText}>Let's roll</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {onboardingScreenNumber < 5 && (
                <FlatList
                  data={ONBOARDING_SCREENS}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  // snapToAlignment="center"
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  ref={flatListRef}
                  pagingEnabled
                  snapToInterval={windowWidth * 0.8}
                  scrollEventThrottle={16}
                  onScroll={(event) => {
                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                    const currentIndex = Math.round(
                      contentOffsetX / (windowWidth * 0.8)
                    );
                    setOnboardingScreenNumber(currentIndex + 1);
                  }}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          width: windowWidth * 0.8,
                          flex: 1,
                          alignItems: "center",
                          paddingTop: 10,
                        }}
                      >
                        <Text style={styles.onboardingTitle}>{item.title}</Text>
                        <Text style={styles.onboardingDescription}>
                          {item.description}
                        </Text>
                      </View>
                    );
                  }}
                  style={{
                    width: windowWidth * 0.8,
                    marginTop: 48,
                  }}
                />
              )}
              {onboardingScreenNumber < 5 ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 48,
                    }}
                  >
                    {DOTS.map((dot, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor:
                              index + 1 === onboardingScreenNumber
                                ? Themes.colors.blue
                                : "lightgrey",
                            marginHorizontal: 4,
                          }}
                        />
                      );
                    })}
                  </View>
                  {onboardingScreenNumber === 4 ? (
                    <TouchableOpacity
                      style={[
                        styles.primaryButton,
                        {marginTop: 24, marginBottom: 36 },
                      ]}
                      onPress={() => {
                        setOnboardingScreenNumber(5);
                      }}
                    >
                      <Text style={styles.onBoardingButtonText}>Continue</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={[
                        styles.primaryButton,
                        {backgroundColor: "white", marginTop: 24, marginBottom: 36 },
                      ]}
                    >
                      <Text style={styles.onBoardingButtonText}>Continue</Text>
                    </View>
                  )}
                </>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      fontFamily: "Poppins-Bold",
                      color: "black",
                      textAlign: "center",
                      marginTop: 36,
                    }}
                  >
                    turno
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: "Poppins-Regular",
                      color: "black",
                      marginTop: 24,
                      textAlign: "center",
                    }}
                  >
                    Get rolling on making hard decisions
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderColor: Themes.colors.salmon,
                      padding: 12,
                      borderRadius: 999,
                      width: windowWidth * 0.8,
                      alignItems: "center",
                      marginTop: 48,
                      borderWidth: 1,
                    }}
                    onPress={() => setCurrentScreen("log in")}
                  >
                    <Text
                      style={[styles.onBoardingButtonText, { color: "black" }]}
                    >
                      Log in
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => setCurrentScreen("sign up")}
                  >
                    <Text style={styles.onBoardingButtonText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  const renderLogIn = () => {
    return (
      <View style={styles.whiteContainer}>
        <TouchableOpacity
          onPress={() => setCurrentScreen("onboarding")}
          style={styles.backCaret}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.spacing} />
        <Image
          source={require("../assets/Themes/Images/DiceFaces/Dice-3.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>turno</Text>
        <Text style={[styles.subtitle, {width: 220, fontSize: 20, marginTop: 6, marginBottom: 30}]}>
          Get rolling on making hard decisions
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <View style={{ height: 32 }} />
        {/* <Link
            href={{
                pathname: "/roll",
            }}
        > */}
        <TouchableOpacity onPress={handleLogIn} style={styles.secondaryButton}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <Text
          style={styles.submessageText}
          onPress={() => setCurrentScreen("sign up")}
        >
          Don't have an account?<Text style={styles.blueText}> Sign Up</Text>
        </Text>
        {/* </Link> */}
      </View>
    );
  };

  const renderSignUp = () => {
    const selectPhoto = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.5, // Lower quality for testing
        });

        if (!result.canceled) {
          setProfilePicUri(result.assets[0].uri);
          const downloadURL = await uploadImage(result.assets[0].uri);
          setDownloadUrl(downloadURL);
        }
      } catch (error) {
        console.error("Error picking image: ", error);
        // Handle the error (e.g., show an alert to the user)
      }
    };

    return (
      <View style={styles.whiteContainer}>
        <TouchableOpacity
          onPress={() => setCurrentScreen("onboarding")}
          style={styles.backCaret}
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        {/* <View style={styles.spacing}/> */}
        <Image
          source={require("../assets/Themes/Images/DiceFaces/Dice-3.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>turno</Text>
        <Text style={[styles.subtitle, {width: 220, fontSize: 20, marginTop: 6, marginBottom: 30}]}>
          Get rolling on making hard decisions
        </Text>
        <TouchableOpacity
          style={styles.profileUploader}
          onPress={() => selectPhoto()}
        >
          <Image
            source={require("../assets/Vectors/EditPencil.png")}
            style={{ position: "absolute", zIndex: 99, right: -5, top: -5 }}
          />
          {profilePicUri ? (
            <Image
              source={{ uri: profilePicUri }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Profile width={100} height={100} />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name (ex: Caleb Liu)"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text.toLowerCase())}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text.toLowerCase())}
          value={password}
        />

        <View style={{ height: 32 }} />
        {/* <Link href={{ pathname: '/roll' }}> */}
        <TouchableOpacity onPress={handleSignUp} style={styles.primaryButton}>
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableOpacity>
        {/* </Link> */}
        <Text
          style={styles.submessageText}
          onPress={() => setCurrentScreen("log in")}
        >
          Already have an account?<Text style={styles.blueText}> Log In</Text>
        </Text>
      </View>
    );
  };

  switch (currentScreen) {
    case "log in":
      return renderLogIn();
    case "sign up":
      return renderSignUp();
    default:
      return renderOnboarding();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: Themes.colors.blue,
    zIndex: 1,
  },
  whiteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "white",
  },
  // onboardingContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 20,
  //   backgroundColor: Themes.colors.blue,
  // },
  logo: {
    width: 50,
    height: 50,
  },
  firstScreenContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 24,
    marginTop: 14,
    fontFamily: "Poppins-Regular",
    width: windowWidth * 0.7,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Themes.colors.blueLight,
    padding: 10,
    marginVertical: 5,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  loginText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  submessageText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: Themes.colors.darkGray,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: Themes.colors.salmon,
    padding: 10,
    borderRadius: 999,
    width: windowWidth * 0.8,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: Themes.colors.salmon,
    padding: 10,
    borderRadius: 999,
    width: windowWidth * 0.8,
    alignItems: "center",
    marginTop: 12,
  },
  onBoardingButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  onboardingTitle: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    // marginTop: 36,
    width: windowWidth * 0.8,
  },
  onboardingDescription: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginTop: 16,
    width: windowWidth * 0.8,
  },
  backCaret: {
    alignSelf: "flex-start",
    marginTop: 50,
    alignSelf: "flex-start",
    width: windowWidth * 0.9,
    height: 50,
  },
  spacing: {
    height: windowHeight * 0.05,
  },
  onboardingSpacing: {
    height: windowHeight * 0.05,
  },
  profileUploader: {
    marginTop: 16,
  },
  blueText: {
    color: Themes.colors.blue,
  },
});
