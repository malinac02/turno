import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PostsProvider } from "./contexts/PostsContext";

import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
