import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const {width} = Dimensions.get('window')

const CustomButton = ({title='Button',onPress=()=>{},primary,icon}) => {
  console.log('primary',primary);
  
  const iconToApply = (icon) => {
    switch (icon) {
      case 'Google':
        return faGoogle
      case 'Facebook':
        return faFacebook
      case 'Apple':
        return faApple
      case 'Phone':
        return faPhone
      default:
        return faGoogle

    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container,!primary && {backgroundColor:colors.themeLight}]} >
{icon &&    <FontAwesomeIcon icon={iconToApply(icon)} size={20} color={colors.white} />}
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
        flexDirection: 'row',
        gap: 10,
    },
    image:{
        height: 40,
        width: 40,
    },
    text: {
        color: colors.white,
        fontFamily: fontFamily.semiBold,
        
    }
})
export default CustomButton

