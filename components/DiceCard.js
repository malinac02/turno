import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function DiceCard({ img, title, user}) {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image}/>
        <Text style={styles.titleText}>{title}</Text>    
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 12}}>
            <Image source={user.profilePic} style={styles.profilePic}/>
            <Text>By @{user.username}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: (windowWidth / 2) - (windowWidth * 0.05),
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#bbb'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 16,
    },
    titleText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginTop: 10,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 999,
        marginRight: 10,
    }
})