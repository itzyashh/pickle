import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store'
import FlashMessage from 'react-native-flash-message'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    <FlashMessage position="top" />
    </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})