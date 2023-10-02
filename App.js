import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
import { Provider, useDispatch } from 'react-redux'
import store from './src/redux/store'
import { getData } from './src/utils/helper'
import { changeTheme } from './src/redux/actions/appSetting'

const App = () => {
  // useEffect(() => {
  //   (
  //     async () => {
  //       try {
  //         let res = await getData('isDark')
  //         console.log('res', res)
  //         !!res && changeTheme(res)
  //       } catch (error) {
  //         console.log('error', error)
  //       }
  //     }
  //   )(
  //   )
  // }, [])

  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})