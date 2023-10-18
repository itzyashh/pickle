import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import FlashMessage from 'react-native-flash-message'

const App = () => {


  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    <FlashMessage position="top" />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})