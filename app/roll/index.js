import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "expo-router";
import DiceCard from "../../components/DiceCard";
import PersonalDiceCard from "../../components/PersonalDiceCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { Themes } from "../../assets/Themes";
import { DICE_DATA } from "../../assets/Themes/Dice";
import { UserContext } from "../../contexts/UserContext";
import { DiceContext } from "../../contexts/DiceContext";
import { LinearGradient } from 'expo-linear-gradient';
import DeleteModal from "../../components/DeleteModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Page() {
  const { user, fetchSavedDiceFromUid, fetchUserFromUid } = useContext(UserContext);
  const { fetchDiceFromDiceId } = useContext(DiceContext);

  const [diceIds, setDiceIds] = useState([]);
  const [diceData, setDiceData] = useState([]);

  const [activePopupId, setActivePopupId] = useState(null);
  const handleTogglePopup = (id) => {
    if (activePopupId === id) {
      setActivePopupId(null);
    } else {
      setActivePopupId(id);
    }
  }; 

  const [isModalVisible, setModalVisible] = useState(null)
  const [diceIdToDelete, setDiceIdToDelete] = useState(null)
  const handleToggleDeleteModal = (id) => {
    setModalVisible(true);
    setDiceIdToDelete(diceData[id].diceId);
    setActivePopupId(null);
  };

  const handleDeleteDice = () => {
    console.log("deleting dice of id: ", diceIdToDelete);
    setModalVisible(false);
    // TODO: backend func to delete dice
  }

  useEffect(() => {
    if (user) {
      const fetchDiceIds = async () => {
        try {
          let result = await fetchSavedDiceFromUid(user.uid);
          if (result) {
            setDiceIds(result);
          }
        } catch (error) {
          console.error('Failed to fetch saved dice:', error);
        }
      };
      fetchDiceIds();
    }
  }, [user]);

  useEffect(() => {
    if (diceIds) {
      const fetchDiceData = async () => {
        const fetchedDiceData = await Promise.all(
          diceIds.map(async (diceId) => {
            const dice = await fetchDiceFromDiceId(diceId);
            return dice;
          })
        );
        setDiceData(fetchedDiceData);
      };
      fetchDiceData().catch(console.error);
    }
  }, [diceIds]);


  return (
    <View style={styles.container}>
      <Header title="My Dice" />
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Choose a dice to roll and make a decision.
        </Text>
      </View>
      <FlatList
        data={diceData}
        numColumns={1}
        // keyExtractor={(item) => item.id}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <View style={{ margin: 5 }}>
            <PersonalDiceCard
              item={item}
              imageUri={item ? item.imageUri : ""}
              diceName={item ? item.name : ""}
              description={item ? item.description : ""}
              community={item ? item.community : false}
              isPopupVisible={activePopupId === index}
              togglePopup={() => handleTogglePopup(index)}
              toggleDeleteModal={() => handleToggleDeleteModal(index)}
            />
          </View>
        )}
      /> 
      { isModalVisible &&
      
        <DeleteModal 
          isModalVisible={isModalVisible} 
          setModalVisible={setModalVisible} 
          onDeleteDice={handleDeleteDice}
        />
      }
      <View style={styles.shadowContainer}>
        <Link
          href={{
            pathname: `/roll/createNewDice`,
          }}
        >
          <View>
          <LinearGradient 
            colors={[Themes.colors.salmon, Themes.colors.mango]}
            style={styles.createDiceContainer}
            start={[0,0]}
            end={[1,1]}
            locations={[0.5,0.8]}
          >
            <FontAwesome5
              name="plus"
              size={45}
              color={'white'}
            />
          </LinearGradient>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.colors.background,
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
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,  
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  createDiceContainer: {
    borderRadius: 50,
    flex: 1,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createDiceText: {
    fontFamily: "Poppins-Regular",
    color: Themes.colors.darkGray,
    fontSize: 14,
    marginTop: 10,
  },
});
