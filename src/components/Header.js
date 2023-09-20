import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../assets/scaling'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBackward, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/colors'

const Header = ({onBackPress}) => {

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
    <TouchableOpacity onPress={handlePress} style={styles.container}>
        <FontAwesomeIcon icon={faCircleChevronLeft} size={moderateScale(30)} color={colors.themeLight} />
    </TouchableOpacity>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:moderateScale(42),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:moderateScale(16),
    }
})