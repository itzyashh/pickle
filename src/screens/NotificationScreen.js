import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import { FlashList } from '@shopify/flash-list'
import FastImage from 'react-native-fast-image'
import CustomImage from '../components/CustomImage'
import { moderateScale, verticalScale } from '../assets/scaling'
import colors from '../constants/colors'
import { useSelector } from 'react-redux'
import fontFamily from '../assets/fonts/fontFamily'

const DATA = [{
  id: '1',
  title: 'First Item',
  time:'15 min ago',
  activity:'liked your post'
}, {
  id: '2',
  title: 'Second Item',
  time:'15 min ago'
}, {
  id: '3',
  title: 'Third Item',
  time:'15 min ago'
}]
const NotificationScreen = () => {
  const {isDark,language} = useSelector(state => state?.appSettings)

  const renderItem = useCallback(({ item }) => {
    return (
      <View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap:moderateScale(16),
        
      }}>
      <CustomImage  type={'circleIcon'} />
      <View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.username}>{item.title}</Text>
        <Text style={[styles.activity,{color:isDark?colors.white:colors.black}]}>{' '}{item.activity}</Text>
      </View>
        <Text style={[styles.time,{color:isDark?colors.grayO70:colors.gray}]}>{item.time}</Text>
      </View>
      </View>
      <View style={styles.seperator}/>

        
      </View>
    )
  }
    , [])



  return (
    <WrapperComponent>
    <Header leftText={'Notification'}   />
    <View
      style={{flex:1,marginLeft:moderateScale(16),marginTop:verticalScale(30)}}
    >

    <FlashList
      
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      estimatedItemSize={140}
    />
    </View>

    </WrapperComponent>
  )
}
const styles = StyleSheet.create({
  username: {
    fontFamily:fontFamily.semiBold,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color:colors.button
  },
  activity: {
    fontSize: moderateScale(16),
    fontFamily:fontFamily.semiBold,
  },
  time: {
    fontSize: moderateScale(14),
    fontFamily:fontFamily.semiBold,
  },
  seperator:{
    flex:1,
    height:moderateScale(1),
    backgroundColor:colors.grayO50,
    width:'78%',
    alignSelf:'flex-end',
    marginVertical:moderateScale(8)
  }
})

export default NotificationScreen
