import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily'

const {width} = Dimensions.get('window')

const CustomButton = ({title='Button',onPress=()=>{},primary}) => {
  console.log('primary',primary);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container,!primary && {backgroundColor:colors.themeLight}]} >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        
        backgroundColor: colors.button,
        height: 50,
        width: width - 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontFamily: fontFamily.semiBold,
        
    }
})
export default CustomButton

