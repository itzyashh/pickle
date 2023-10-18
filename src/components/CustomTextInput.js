import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, textScale } from '../assets/scaling'
import colors from '../constants/colors'
import fontFamily from '../assets/fonts/fontFamily'

const CustomTextInput = ({
  placeholder,
  onChangeText,
  placeholderTextColor=colors.C183D3D,
  secureTextEntry=false,
  toggleButton=false,
  onTogglePress
}) => {
  return (
    <View style={styles.container}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}

    />
    {toggleButton && <Text style={styles.ToggleButton} onPress={onTogglePress}>{secureTextEntry?'Show':'Hide'}</Text>}
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        height:moderateScale(52),
        borderRadius:moderateScale(8),
        backgroundColor:colors.themeLight,
        justifyContent:'center',
        paddingHorizontal:moderateScale(16),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        }
        ,
    textInput: {
        flex:1,
        fontFamily:fontFamily.semiBold,
        fontSize:textScale(16),
        color:colors.theme
    },
    ToggleButton: {
        fontFamily:fontFamily.regular,
        fontSize:textScale(16),
    }
})