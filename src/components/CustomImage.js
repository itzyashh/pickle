import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { moderateScale } from '../assets/scaling'

const CustomImage = ({source={uri:'https://placehold.co/600x400/png'},type}) => {
 
    const styleToApply = () => {
        switch (type) {
            case 'avatar':
                return styles.avatar
            default:
                return styles.image
        }
    }

  return <FastImage source={source} style={styleToApply()} />
    
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
    }
})