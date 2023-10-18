import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import fontFamily from '../assets/fonts/fontFamily'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { moderateScale } from '../assets/scaling'
import { useSelector } from 'react-redux'

const {width} = Dimensions.get('window')

const CustomButton = ({title='Button',onPress=()=>{},primary,icon,fontSize}) => {
  const isDark = useSelector(state => state?.appSettings?.isDark)
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
{icon &&    <FontAwesomeIcon icon={iconToApply(icon)} size={moderateScale(20)} color={isDark?colors.white:colors.C183D3D} />}
        <Text style={[styles.text,fontSize&&{fontSize:fontSize},!isDark&&{color:'#292929'}]}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {        
        backgroundColor: colors.button,
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    image:{
        height: moderateScale(40),
        width: moderateScale(40),
    },
    text: {
        color: colors.white,
        fontFamily: fontFamily.semiBold,
        fontSize: moderateScale(15),
    }
})
export default CustomButton

