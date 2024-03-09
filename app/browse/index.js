import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Themes } from "../../assets/Themes";
import { Link, Stack } from "expo-router";
import Header from "../../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import DiceCard from "../../components/DiceCard";
import { useState, useEffect, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { DICE_DATA } from "../../assets/Themes/Dice";
import { UserContext } from "../../contexts/UserContext";
import { DiceContext } from "../../contexts/DiceContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const params = useLocalSearchParams();

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  
  const { user } = useContext(UserContext);
  const { fetchCommunityDice } = useContext(DiceContext);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchDice = async () => {
      try {
        let result = await fetchCommunityDice(user.uid);
        if (result) {
          setDataList(result);
        }
      } catch (error) {
        console.error('Failed to fetch community dice:', error);
      }
    };
    fetchDice();
  });

  // const addDice = [{}];
  // const dataList = [...diceData, ...addDice];

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Community Dice" />
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Browse community dice to add to your dice collection.
          
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchIconContainer}>
            <Ionicons
              name="search-sharp"
              size={22}
              color={Themes.colors.darkGray}
            />
          </View>
        
          <TextInput style={styles.searchBar} placeholder="Search" />
          <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
            <FontAwesome5 name="sliders-h" size={24} color="#777" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }} />
        {filtersVisible && (
          <View style={styles.filtersMenu}>
            <Text style={styles.filtersMenuHeaderText}>Filter</Text>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={
                  activeFilter === "Exercise"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Exercise")}
              >
                <Text
                  style={
                    activeFilter === "Exercise"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Exercise
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeFilter === "Work"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Work")}
              >
                <Text
                  style={
                    activeFilter === "Work"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Work
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeFilter === "Academic"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Academic")}
              >
                <Text
                  style={
                    activeFilter === "Academic"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Academic
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={
                  activeFilter === "Relax"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Relax")}
              >
                <Text
                  style={
                    activeFilter === "Relax"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Relax
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeFilter === "Social"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Social")}
              >
                <Text
                  style={
                    activeFilter === "Social"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Social
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeFilter === "Food"
                    ? styles.activeFilterButton
                    : styles.filterButton
                }
                onPress={() => setActiveFilter("Food")}
              >
                <Text
                  style={
                    activeFilter === "Food"
                      ? styles.activeFilterText
                      : styles.filterText
                  }
                >
                  Food
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{ marginTop: 6 }} />
        <FlatList
          data={dataList}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{ margin: 5 }}>
              <Link
                href={{
                  pathname: `/browse/CommunityDiceDetails`,
                  params: {
                    activities: item.choices,
                    title: item.name,
                    img: item.imageUri,
                    id: item.diceId,
                    creator: item.creator,
                    pageTitle: "Community Dice Details"
                    // profilePic: item.user.profilePic,
                  },
                }}
              >
                <DiceCard
                  img={item.imageUri}
                  title={item.name}
                  creator={item.creator}
                  // numRolled={item.numRolled}
                  numRolled={0}
                  numSaved={item.saves}
                />
              </Link>
            </TouchableOpacity>
          )}
        />
        {filtersVisible && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            onPress={() => setFiltersVisible(false)}
            activeOpacity={1}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.colors.background,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 2,
  },
  instructionsContainer: {
    width: windowWidth - windowWidth * 0.1,
    marginTop: 5,
    marginBottom: 25,
    alignItems: "left",
    justifyContent: "center",
  },
  instructionsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  searchIconContainer: {
    height: 40,
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Themes.colors.lightGray,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: Themes.colors.lightGray,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 5,
    paddingRight: 10,
    marginRight: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  filtersMenu: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: "90%",
    zIndex: 3,
  },
  filterButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Themes.colors.salmon,
    width: 100,
  },
  filterText: {
    textAlign: "center",
    padding: 8,
    color: Themes.colors.salmon,
    fontFamily: "Poppins-Regular"
  },
  activeFilterButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Themes.colors.salmon,
    width: 100,
    backgroundColor: Themes.colors.salmon,
  },
  activeFilterText: {
    textAlign: "center",
    padding: 8,
    color: "#fff",
    fontFamily: "Poppins-Regular"
  },
  filtersMenuHeaderText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});
