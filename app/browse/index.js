import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Themes } from "../../assets/Themes";
import { Link, Stack } from "expo-router";
import Header from "../../components/Header";
import { useFonts } from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import DiceImage from '../../assets/Themes/Images/DiceFaces/Dice-1.png'
import DiceCard from "../../components/DiceCard";
import { useState } from "react";

export default function Page() {

    const [filtersVisible, setFiltersVisible] = useState(false)
    const [activeFilter, setActiveFilter] = useState('')
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/Poppins/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }

 

  const DATA = [
    {
        img: require("../../assets/Themes/Images/DiceFaces/Dice-1.png"),
        title: "Tapas in Barcelona",
        user: {
            username: "username",
            profilePic: require("../../assets/Themes/Images/profileImages/Malina.jpg"),
        },
    },
    {
        img: require("../../assets/Themes/Images/DiceFaces/Dice-1.png"),
        title: "Museums in the Bay",
        user: {
            username: "username",
            profilePic: require("../../assets/Themes/Images/profileImages/Malina.jpg"),
        },
    },
    {
        img: require("../../assets/Themes/Images/DiceFaces/Dice-1.png"),
        title: "Stanford Study Spots",
        user: {
            username: "cliu18",
            profilePic: require("../../assets/Themes/Images/profileImages/Digo.jpeg"),
        }
    }
  ]
  return (
    <>
    <View style={styles.container}>
        
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="Browse" />
      <Text style={styles.headerText}>Community Dice</Text>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
        <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
            <FontAwesome5 name="sliders-h" size={24} color="#777" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 12}}/>
        {filtersVisible && 
            <View style={styles.filtersMenu}>
                <Text style={styles.filtersMenuHeaderText}>Filter</Text> 
                <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={activeFilter === 'Exercise' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Exercise')}>
                        <Text style={activeFilter === 'Exercise' ? styles.activeFilterText : styles.filterText}>Exercise</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity style={activeFilter === 'Work' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Work')}>
                        <Text style={activeFilter === 'Work' ? styles.activeFilterText : styles.filterText}>Work</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={activeFilter === 'Academic' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Academic')}>
                        <Text style={activeFilter === 'Academic' ? styles.activeFilterText : styles.filterText}>Academic</Text>
                    </TouchableOpacity>
                </View>   
                <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={activeFilter === 'Relax' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Relax')}>
                        <Text style={activeFilter === 'Relax' ? styles.activeFilterText : styles.filterText}>Relax</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={activeFilter === 'Social' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Social')}>
                        <Text style={activeFilter === 'Social' ? styles.activeFilterText : styles.filterText}>Social</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={activeFilter === 'Food' ? styles.activeFilterButton : styles.filterButton} onPress={() => setActiveFilter('Food')}>
                        <Text style={activeFilter === 'Food' ? styles.activeFilterText : styles.filterText}>Food</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        }
        <View style={{marginTop: 12}}/>
      <FlatList 
        
        data={DATA}
        numColumns={2}
        renderItem={({item, index}) => 
        <TouchableOpacity style={{margin: 5}}>
            <Link href={{pathname: '/browse/DicePage', params: {item: item}}}>
            <DiceCard 
                img={item.img}
   
                title={item.title}
                user={item.user}
            />
            </Link>
            </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
        />
    {filtersVisible && <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1}} onPress={() => setFiltersVisible(false)} activeOpacity={1}/>}
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
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 24,

  },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    searchBar: {
        width: '90%',
        height: 40,
        backgroundColor: Themes.colors.lightGray,
        borderRadius: 10,
        padding: 10,
        fontFamily: "Poppins-Regular",
        fontSize: 16,
    },
    filtersMenu: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        width: '90%',
        zIndex: 3,

    },
    filterButton: {
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: Themes.colors.salmon,
        width: 100,
    },
    filterText: {
        textAlign: 'center',
        padding: 10,
        color: Themes.colors.salmon,
    },
    activeFilterButton: {
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: Themes.colors.salmon,
        width: 100,
        backgroundColor: Themes.colors.salmon,
    },
    activeFilterText: {
        textAlign: 'center',
        padding: 10,
        color: '#fff',
    },
    filtersMenuHeaderText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
        textAlign: 'center'
    }
});