import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import strings from '../constants/lang'
import WrapperComponent from '../components/WrapperComponent'
import { FlashList } from '@shopify/flash-list'
import { styles } from './styles/homeStyle'
import CustomImage from '../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { moderateScale, verticalScale } from '../assets/scaling'

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
]



const HomeScreen = () => {

  const {isDark,language} = useSelector(state => state?.appSettings)

  
  const renderItem = ({ item }) => (
    <View style={styles.box}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{flexDirection:'row',alignItems:'center',gap:20,}}>

        <CustomImage type={'avatar'} source={{uri:'https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?size=626&ext=jpg'}} />
        <View style={{gap:moderateScale(5)}}>
        <Text style={[styles.name,isDark&&{color:'#fff'}]}>Maria Ann</Text>
        <Text>Sector 1, Bucharest</Text>
        </View>
    </View>
    <FontAwesomeIcon color={isDark?colors.white:colors.black} icon={faEllipsis} size={20} />
    </View>

    </View>
  )



  return (
    <WrapperComponent style={styles.container}>
    <FlashList
      data={DATA}
      renderItem={renderItem}
      estimatedItemSize={100}
      keyExtractor={item => item.id}
    />
    </WrapperComponent>
  )
}

export default HomeScreen

