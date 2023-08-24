import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { routes } from '../navigation/routes'

const InitialScreen = ({navigation}) => {
  return (
    <View 
      style={styles.container}
     > 
      <Text onPress={()=>navigation.navigate(routes.login)} >InitialScreen</Text>
    </View>
  )
}

export default InitialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})