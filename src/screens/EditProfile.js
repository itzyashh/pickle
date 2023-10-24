import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import strings from '../constants/lang'
import CustomImage from '../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { moderateScale, verticalScale } from '../assets/scaling'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { styles } from './styles/editProfileStyle'

const EditProfile = () => {
  const {isDark,language} = useSelector(state => state?.appSettings)

  return (
   <WrapperComponent>
    <Header showTitle title={strings.EDIT_PROFILE} />
    <TouchableOpacity style={{alignSelf:'center'}}>

    <CustomImage  imageStyle={{width:moderateScale(150),height:moderateScale(150),borderRadius:moderateScale(200),marginTop:moderateScale(50)}} />
    <View style={[styles.iconContainer,isDark&&{backgroundColor:colors.themeLight}]}>
    <FontAwesomeIcon  icon={faPen} size={moderateScale(14)} color={isDark?colors.white:colors.black} />
    </View>
    </TouchableOpacity>
   </WrapperComponent>
  )
}

export default EditProfile