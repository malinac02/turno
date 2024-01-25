import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Header from '../../components/Header'
import { Themes } from '../../assets/Themes'

export default function DicePage() {
    const params = useLocalSearchParams()
    useEffect(() => {
      if (params) {
        console.log(params.item.title)
      }
    }, [params])
    
  return (
    <View style={styles.container}>
         <Stack.Screen options={{ headerShown: false }} />
      <Header title="Browse" />
      <Text>DicePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.colors.background,
    },
})