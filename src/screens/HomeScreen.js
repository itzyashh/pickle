import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import strings from '../constants/lang'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{strings.HOME}</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center'
  }
})