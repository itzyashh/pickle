import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { moderateScale } from '../assets/scaling'

const CustomImage = ({source={uri:'https://placehold.co/600x400/png'},type,imageStyle={},resizeMode}) => {
 
    const styleToApply = () => {
        switch (type) {
            case 'avatar':
                return styles.avatar

            case 'full':
                return styles.full
            case 'circleIcon':
                return {...styles.circleIcon,...imageStyle}
            case 'avatarLarge':
                return styles.avatarLarge
            default:
                return {...styles.image,...imageStyle}
        }
    }

  return <FastImage source={{

    uri:source.uri,
    priority: FastImage.priority.normal,
    


  }} 
    resizeMode={resizeMode}
  style={styleToApply()} 

  />
    
}

export default CustomImage

const styles = StyleSheet.create({
    image: {
        width: moderateScale(300),
        height: moderateScale(300),
    },
    avatar: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
    },
    full: {
        width: '100%',
        height: '100%',
    },
    circleIcon:{
        width:moderateScale(50),
        height:moderateScale(50),
        borderRadius:moderateScale(25),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    avatarLarge:{
        width:moderateScale(85),
        height:moderateScale(85),
        borderRadius:moderateScale(50),
    }
    
})