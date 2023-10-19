import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../assets/scaling'

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Text>SearchBar</Text>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        height:moderateScale(48),
    }
})