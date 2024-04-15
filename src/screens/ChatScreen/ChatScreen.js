import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperComponent from '../../components/WrapperComponent'
import Header from '../../components/Header'
import { FlashList } from '@shopify/flash-list'
import LocalHost from '../../api/LocalHost'

const ChatScreen = () => {

    const [chatList, setChatList] = useState([])

    useEffect(() => {
        getChatList()
    }, [])

    const renderItem = ({ item }) => (
        
        <View style={{backgroundColor:'white',padding:10,margin:10}}>
            <Text>{item?.users[0]?.userName}</Text>
        </View>
    )

    const getChatList = async () => {
        try {
            const res = await LocalHost.get('/chat/myChats')
            console.log('resres', res.data)
            setChatList(res.data.data)
        } catch (error) {
            console.log('error', error)
        }
    }


  return (
    <WrapperComponent>
        <Header showTitle title='Chat' />
        <FlashList
        data={chatList}
        renderItem={renderItem}
        estimatedItemSize={100}
        />
    </WrapperComponent>
  )
}

export default ChatScreen