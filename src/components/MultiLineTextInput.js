import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, textScale } from '../assets/scaling'
import colors from '../constants/colors'
import fontFamily from '../assets/fonts/fontFamily'

const MultiLineTextInput = ({
  placeholder,
  onChangeText,
  placeholderTextColor=colors.C183D3D,
  secureTextEntry=false,
  toggleButton=false,
  onTogglePress,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container,containerStyle]}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      {...props}
    />
    {toggleButton && <Text style={styles.ToggleButton} onPress={onTogglePress}>{secureTextEntry?'Show':'Hide'}</Text>}
    </View>
  )
}

export default MultiLineTextInput

const styles = StyleSheet.create({
    container: {
        minHeight:moderateScale(52),
        maxHeight:moderateScale(150),
        height:moderateScale(100),
        borderRadius:moderateScale(8),
        paddingVertical:moderateScale(8),
        backgroundColor:colors.themeLight,
        justifyContent:'center',
        paddingHorizontal:moderateScale(16),
        flexDirection:'row'
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