import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { Themes } from "../../assets/Themes";
import Category from "../../components/Category";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Page() {
  const { logoutUser, user, fetchUserFromUid } = useContext(UserContext);

  const [uid, setUid] = useState(null);
  useEffect(() => {
    if (user) {
      setUid(user.uid);
    }
  }, [user]);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      let result = await fetchUserFromUid(user.uid);
      setUserData(result);
      console.log("HII: ", result);
    };
    if (user) {
      fetchUserData();
      // console.log(userData.password);
    }
  }, [user]);

  const handleLogout = () => {
    router.replace("/");
    logoutUser();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Settings" />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Name</Text>
        <TextInput
          editable={false}
          style={styles.input}
          value={userData.fullName}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          editable={false}
          style={styles.input}
          value={userData.email} // userData.email //userData.profilePicUri
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Username</Text>
        <TextInput
          editable={false}
          style={styles.input}
          value={userData.username}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Password</Text>
        <TextInput
          editable={false}
          style={styles.input}
          value="*****************"
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 5,
    backgroundColor: Themes.colors.background,
  },
  logoutButton: {
    marginTop: 32,
    height: 40,
    width: 360,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: Themes.colors.salmon,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  sectionTitle: {
    marginHorizontal: 12,

    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    // fontFamily: "Poppins-Regular",
    // backgroundColor: Themes.colors.lightGray,
    // borderRadius: 5,
    // borderWidth: 3,
    // borderColor: Themes.colors.lightGray,
    // padding: 10,
    fontSize: 16,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Themes.colors.darkGray,
    height: 45,
    fontFamily: "Poppins-Regular",
  },
  section: {
    gap: 10,
    paddingTop: 10,
  },
});
