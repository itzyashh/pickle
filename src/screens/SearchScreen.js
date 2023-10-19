import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import WrapperComponent from '../components/WrapperComponent'
import { FlashList } from '@shopify/flash-list'
import { moderateScale, width } from '../assets/scaling'
import CustomImage from '../components/CustomImage'
import SearchBar from '../components/SearchBar'

const SearchScreen = () => {
const {width,height} = Dimensions.get('window')
  const renderItem = useCallback( ({ item }) => (
<View style={{borderWidth:1,}}>

    <CustomImage imageStyle={{width:width/3,height:moderateScale(200)}}/>
</View>
  ),[])

  return (
    <WrapperComponent>
    {/* <View style={{flex:1}}>
    <FlashList
      data={[{},{},{},{}]}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={200}
    />
    </View> */}
    <SearchBar/>

    </WrapperComponent>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})