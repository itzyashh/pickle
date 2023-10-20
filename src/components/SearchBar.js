import { StyleSheet,  TextInput, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../assets/scaling'
import colors from '../constants/colors'
import { useSelector } from 'react-redux'

const SearchBar = ({placeholder,onPress}) => {
  const {isDark,language} = useSelector(state => state?.appSettings)
  const [text, setText] = React.useState('');
  const handleSearch = (txt) => {
    setText(txt)
    onPress(txt)
  }
  return (
    <View style={[styles.container,{backgroundColor:isDark?colors.themeLight:colors.theme}]}>
      <TextInput
      placeholder={placeholder}
      placeholderTextColor={isDark?colors.whiteO70:colors.black}
      style={[styles.textInput,{paddingLeft:moderateScale(10),color:isDark?colors.white:colors.black}]}
      onChangeText={handleSearch}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        borderRadius:moderateScale(5),
        height:moderateScale(48),
        justifyContent:'center',
    },
    textInput:{
        fontSize:moderateScale(16),
    }
})