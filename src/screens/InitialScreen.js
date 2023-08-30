import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { routes } from '../navigation/routes'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/reducers/auth'

const InitialScreen = ({navigation}) => {

  const dispatch = useDispatch()

  const onLogin = () => {
    dispatch(setUserData({isLogged: true}))
  }

  return (
    <View 
      style={styles.container}
     > 
      <Text onPress={()=>navigation.navigate(routes.login)} >InitialScreen</Text>
      <Button title="Login" onPress={onLogin} />
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