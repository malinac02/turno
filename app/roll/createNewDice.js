import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Link, Stack } from "expo-router";
import { ActivitiesContext } from "../../contexts/ActivitiesContext";
import { Themes } from "../../assets/Themes";
import Category from "../../components/Category";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import { FontAwesome5 } from "@expo/vector-icons";
import CreateActivityModal from "../../components/CreateActivityModal";

export default function Page() {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const { addActivity } = useContext(ActivitiesContext);
  const [currDice, setCurrDice] = useState({})
  const [activities, setActivities] = useState([[]])

  //modal variables
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const handleAddActivity = () => {
    if (isFormFilled) {
      // addActivity(activityName, description);
      

    }
  };

  const clearFields = () => {
    console.log("go back")
    setActivityName("");
    setDescription("");
    setActivities([[]])
  }

  const [isFormFilled, setIsFormFilled] = useState(false);

  // useEffect(() => {
  //   setCurrDice({activityName: activityName, description: description, activities: activities})
  // },[activityName, description, activities])

  useEffect(() => {
    setIsFormFilled(activityName.trim().length > 0);
  }, [activityName]);

  useEffect(() => {
    console.log("currDice", currDice)
    console.log("activities", activities)
  }, [currDice, activities])

  const categories = [
    ["Exercise", "running"],
    ["Relax", "cat"],
    ["Social", "user-friends"],
    ["Work", "briefcase"],
    ["Academic", "graduation-cap"],
    ["Chore", "broom"],
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="Create New Dice" onPress={clearFields}/>
        <ScrollView>
        <View style={styles.activityNameContainer}>
          <Text style={styles.title}>
            Dice Name <Text style={styles.asterick}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. Go on a Run!"
            value={activityName}
            onChangeText={setActivityName}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            editable
            multiline
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            numberOfLines={4}
            style={styles.input}
            placeholder="Ex. Go on a run around Lake Lagunita"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        
        <View style={styles.activityCardContainer}>
          <Text style={[styles.title, {marginBottom: 10}]}>
            Activities (0/6)<Text style={styles.asterick}>*</Text>
          </Text>
          {activities.length > 0 && (
            <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 6 }}>
              {activities.map((item, index) => {
                if (item.length === 0) {
                  return (
                    <TouchableOpacity
                      key={`activity-${index}`}
                      onPress={toggleModal}
                      style={{ margin: 5 }}
                    >
                      <View style={styles.addActivityContainer}>
                        <View style={[styles.activityContainer, styles.gray]}>
                          <View style={styles.createActivityContainer}>
                            <FontAwesome5
                              name="plus"
                              size={45}
                              color={Themes.colors.salmon}
                              style={styles.createActivity}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      key={`activity-${index}`}
                      style={{ margin: 5 }}
                      onPress={() => {
                        console.log("pressed activity", index + 1);
                      }}
                    >
                      <Activity
                        activityObject={item}
                        index={index + 1}
                        isEditable={true}
                      />
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
            </>
          ) }
        </View>
        <View style={{height: 90}} />
        </ScrollView>

        <CreateActivityModal
          activities={activities}
          setActivities={setActivities}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          setModalVisible={setModalVisible}
        />
        
        <View style={{position: 'absolute', bottom: 30}}>
          <Link
            disabled={!isFormFilled}
            href={{
              pathname: "/activities/home",
              params: {
                name: "Alan",
              },
            }}
            onPress={handleAddActivity}
          >
            <View style={[styles.button, isFormFilled ? styles.buttonEnabled : styles.buttonDisabled,]}>
              <Text style={styles.buttonText}>Create Dice</Text>
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
    display: "flex",
    alignItems: "center",
    // flex: 1,
    gap: 10,
    backgroundColor: Themes.colors.background
  },
  title: {
    marginHorizontal: 12,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Themes.colors.darkGray,
    fontFamily: "Poppins-Regular",
  },
  activityNameContainer: {
    width: "100%",

  },
  descriptionContainer: {
    marginTop: 10,
    width: "100%",
  },
  activityCardContainer: {
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 340,
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,
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
  addActivityContainer: {
    flex: 1,
    height: 150,
    width: 170,
  },
  activityContainer: {
    backgroundColor: Themes.colors.salmonMedium,
    height: 150,
    width: 170,
    borderRadius: 10,
    justifyContent: "center",
    // gap: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // paddingTop: 30,
  },
  gray: {
    borderWidth: 0.5,
    borderColor: Themes.colors.darkGray,
    backgroundColor: Themes.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  createActivityContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  createActivity: {
    alignSelf: "center",
  },
  activitiesContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: "space-between",
  },
  activitiesRow: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
