  import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
  import React, { useCallback } from 'react'
  import WrapperComponent from '../components/WrapperComponent'
  import { FlashList } from '@shopify/flash-list'
  import { moderateScale, width } from '../assets/scaling'
  import CustomImage from '../components/CustomImage'
  import SearchBar from '../components/SearchBar'
import { styles } from './styles/searchScreenStyle'

  const SearchScreen = () => {
  const {width,height} = Dimensions.get('window')
    const renderItem = useCallback( ({ item }) => (
  <TouchableOpacity style={{borderWidth:1,}}>

      <CustomImage imageStyle={{width:width/3,height:moderateScale(200)}}/>
  </TouchableOpacity>
    ),[])

    return (
      <WrapperComponent>
      <View style={styles.searchBarContainer}>

      <SearchBar placeholder={'Search'} onPress={val=>console.log(val)}/>
      </View>
      <View style={{flex:1}}>
      <FlashList
        data={[{},{},{},{}]}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={200}
      />
      </View>

      </WrapperComponent>
    )
  }

  export default SearchScreen
