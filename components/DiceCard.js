import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DiceCard({ img, title, user, numSaved, numRolled}) {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image}/>
        <Text style={styles.titleText}>{title}</Text>    
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 2, marginLeft: 10}}>
            <Image source={user.profilePic} style={styles.profilePic}/>
            <Text style={{fontSize: 12}}>By @{user.username}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 8}}>
            <Image style={styles.bookmarkIcon} source={require('../assets/Themes/Images/other/bookmarkGrey.png')}/>
            <Text style={styles.statsText}>{numSaved}</Text>
            <Image style={styles.bookmarkIcon} source={require('../assets/Themes/Images/other/diceRoll.png')}/>
            <Text style={styles.statsText}>{numRolled}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: (windowWidth / 2) - (windowWidth * 0.05),
        borderRadius: 20,
        height: 250,
        borderWidth: 1,
        borderColor: '#E2E2E2',
    },
    image: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    titleText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 999,
        marginRight: 10,
    }, 
    statsText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginRight: 4,
        color: "#9C9C9C",
    },
    bookmarkIcon: {
        width: 16,
        height: 16,
        marginRight: 2,
    }
})