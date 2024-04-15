import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../assets/scaling'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBackward, faCircleChevronLeft, faComment } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/colors'
import { useSelector } from 'react-redux'
import fontFamily from '../assets/fonts/fontFamily'

const Header = ({onBackPress,
    rightIcon=false,
    leftText,showTitle,title,rightText,onRightPress,backBtnDisabled}) => {
    const {isDark,language} = useSelector(state => state?.appSettings)

    const navigation = useNavigation()

    const handlePress = () => {
        if(onBackPress){
            onBackPress()
        }
        else{
            navigation.goBack()
        }
    }
  return (
    !leftText?
    <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }}>
    <View style={{
        flexDirection:'row',
        alignItems:'center',
    }}>

  {!backBtnDisabled &&  <TouchableOpacity onPress={handlePress} style={styles.container}>
        <FontAwesomeIcon icon={faCircleChevronLeft} size={moderateScale(30)} color={colors.themeLight} />
    </TouchableOpacity>}
    {showTitle && <Text  style={[styles.title,isDark && {color:colors.white}]}>{title}</Text>}
    </View>
        {rightIcon &&
        <TouchableOpacity onPress={onRightPress} >
         <FontAwesomeIcon icon={faComment}
        style={{marginHorizontal:moderateScale(16)}}
         size={moderateScale(30)} color={colors.themeLight} />
         </TouchableOpacity>}
    {rightText && <Text style={{
        fontFamily:fontFamily.medium,
        fontSize:moderateScale(18),
        fontWeight:'bold',
        color:isDark?colors.white:colors.black,
        marginHorizontal:moderateScale(16)
    }}

    onPress={onRightPress}
    >{rightText}</Text>}
    </View>
    :<Text style={{
        fontFamily:fontFamily.medium,
        fontSize:moderateScale(18),
        fontWeight:'bold',
        color:isDark?colors.white:colors.black,
        marginHorizontal:moderateScale(16)
    }}>{leftText}</Text>   

    
    

  )
}
 
export default Header

const styles = StyleSheet.create({
    container:{
        height:moderateScale(42),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:moderateScale(16),
    },
    title:{
        fontFamily:fontFamily.medium,
        fontSize:moderateScale(18),
        fontWeight:'bold',
        color:colors.black,
        marginHorizontal:moderateScale(8)
    }
})