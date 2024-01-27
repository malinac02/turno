import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { Link } from 'expo-router'
import DiceCard from '../../components/DiceCard'
import PersonalDiceCard from '../../components/PersonalDiceCard'
import { FontAwesome5 } from '@expo/vector-icons'
import { Themes } from '../../assets/Themes'
import { DICE_DATA } from '../../assets/Themes/Dice'

const windowWidth = Dimensions.get('window').width;

export default function Page() {
  
  
  const addDice = [{}];
  const dataList = [...DICE_DATA, ...addDice];

  return (
    <View style={styles.container}>
      <Header title="My Dice" />
      <View style={{height: 24}} />
      <FlatList 
        data={dataList}
        numColumns={2}
        renderItem={({item, index}) => 
        <TouchableOpacity style={{margin: 5}}>
          {index !== dataList.length - 1 ? (
            <Link href={{
                pathname: `/roll/roll`, 
                params: {
                  title: item.title,
                  numRolled: item.numRolled,
                  numSaved: item.numSaved,
                  username: item.user.username,
                  profilePic: item.user.profilePic,
                  img: item.img,
                  id: item.id,
                  activities: item.activities,
                }
              }}>
              <PersonalDiceCard 
                img={item.img}
                title={item.title}
                user={item.user}
                numRolled={item.numRolled}
                numSaved={item.numSaved}
              />
            </Link>
          ) : ( 
            <Link href={{
              pathname: `/roll/createNewDice`, 
            }}>
              <View style={styles.createDiceContainer}>
                <FontAwesome5
                  name="plus"
                  size={45}
                  color={Themes.colors.salmon}
                />
              </View>
            </Link>
          )}
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Themes.colors.background,
  },
  createDiceContainer: {
    width: (windowWidth / 2) - (windowWidth * 0.05),
    borderRadius: 20,
    height: 230,
    borderWidth: 1,
    borderColor: Themes.colors.mediumGray,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
})