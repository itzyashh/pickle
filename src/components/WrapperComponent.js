import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const WrapperComponent = ({style={},children}) => {
  return (
    <View style={styles.container}>
    <SafeAreaView>
        {children}
    </SafeAreaView>
    </View>
  )
}

export default WrapperComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
})