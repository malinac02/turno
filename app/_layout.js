import { Tabs } from "expo-router/tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Kudos from "../components/Icons/Kudos";
import KudosIcon from "../components/Icons/Kudos";
import { Themes } from "../assets/Themes";
import { PostsProvider } from "../contexts/PostsContext";
import {
  ActivitiesProvider,
  ActivitiesContext,
} from "../contexts/ActivitiesContext";
import { InProgressProvider } from "../contexts/InProgressContext";
import { useFonts } from "expo-font";
import Dice from "../components/Icons/Dice";
import { UserContextProvider } from "../contexts/UserContext";
import { DiceContextProvider } from "../contexts/DiceContext";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <UserContextProvider>
      <DiceContextProvider>
        <InProgressProvider>
          <ActivitiesProvider>
            <PostsProvider>
              <Tabs
                initialRouteName="feed"
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: Themes.colors.salmon,
                  tabBarInactiveTintColor: "black",
                  tabBarStyle: {
                    height: 80,
                    backgroundColor: Themes.colors.lightGray,
                  },
                  // tabBarShowLabel: false,
                  tabBarLabelStyle: {
                    display: "none",
                  },
                }}
              >
                <Tabs.Screen
                  name="progress/index"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="index"
                  options={{
                    // no tab bar visible
                    href: null,
                    tabBarStyle: {
                      display: "none",
                    },
                  }}
                />

                <Tabs.Screen
                  name="roll/index"
                  options={{
                    tabBarLabel: "My Dice",
                    tabBarLabelStyle: styles.iconAndText,
                    tabBarIcon: ({ size, color }) => (
                      <View>
                        <Dice size={35} color={color} notFilled={true} />
                      </View>
                    ),
                  }}
                />
                <Tabs.Screen
                  name="activities"
                  options={{
                    tabBarLabelStyle: styles.iconAndText,
                    tabBarLabel: "Activities",
                    tabBarIcon: ({ size, color }) => (
                      <FontAwesome5 name="clipboard" size={size} color={color} />
                    ),
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="feed"
                  options={{
                    tabBarLabelStyle: styles.iconAndText,
                    tabBarLabel: "Feed",
                    tabBarIcon: ({ color }) => (
                      <KudosIcon size={27} color={color} notFilled={true} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="browse/CommunityDiceDetails"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="browse/index"
                  options={{
                    tabBarLabelStyle: styles.iconAndText,
                    tabBarLabel: "Community",

                    tabBarIcon: ({ size, color }) => (
                      // <FontAwesome5 name="search" size={size} color={color} />
                      <Ionicons
                        name="search-sharp"
                        size={size + 4}
                        color={color}
                      />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="profile"
                  options={{
                    tabBarLabelStyle: styles.iconAndText,
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ size, color }) => (
                      <FontAwesome5
                        name="user-circle"
                        size={size + 3}
                        color={color}
                      />
                      // <Ionicons name="person-outline" size={size + 5} color={color} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="friendsPage"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="friendProfile"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="roll/roll"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="roll/createNewDice"
                  options={{
                    href: null,
                  }}
                />
                 <Tabs.Screen
                  name="roll/editDice"
                  options={{
                    href: null,
                  }}
                />
                <Tabs.Screen
                  name="roll/MyDiceDetails"
                  options={{
                    href: null,
                  }}
                />
              </Tabs>
            </PostsProvider>
          </ActivitiesProvider>
        </InProgressProvider>
      </DiceContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  iconAndText: {
    display: "flex",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
});
