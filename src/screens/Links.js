import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import { FlashList } from '@shopify/flash-list'
import { moderateScale } from '../assets/scaling'
import colors from '../constants/colors'

const Links = () => {

    const renderItem = useCallback( ({ item }) => (
    <View>
        <Text style={{color:colors.blue}}>https://www.youtube.com/watch?v=f_rahNNVDQ8&t=3104s</Text>
    </View>

          ),[])


  return (
    <WrapperComponent>
        <Header showTitle title="Add Links" />
        <View style={{flex:1,padding:moderateScale(16)}}>
            <FlashList
                data={[{}, {}, {}]}
                renderItem={renderItem}
                estimatedItemSize={200}
                keyExtractor={(item, index) => index.toString()}
                />
        </View>
    </WrapperComponent>
  )
}

export default Links