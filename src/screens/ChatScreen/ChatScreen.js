import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import WrapperComponent from '../../components/WrapperComponent'
import Header from '../../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux';
import { getMessage } from '@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware'
import LocalHost from '../../api/LocalHost'
import { showError } from '../../utils/helper'

const ChatScreen = ({navigation, route}) => {
    const item = route.params.item
    const receiverName = route.params.name
    console.log('params', item)
    const user  = useSelector(state => state?.auth.userData)

    const [messages, setMessages] = useState([])

    // _id: 1,
    // text: 'Hello developer',
    // createdAt: new Date(),
    // user: {
    //   _id: 2,
    //   name: 'React Native',
    //   avatar: 'https://i.pravatar.cc/300',
    // },

    useEffect(() => {
      getMessages()
    }, [])

    const getMessages = async () => {
      const res = await LocalHost.get(`/message/myMessages?chatId=${item?._id}`)
      console.log('res getmessages', res.data)
      setMessages(res.data.data.reverse())
    }


    
      const onSend =  useCallback( async(messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
        console.log('messages', messages)
        const res = await LocalHost.post('/message/sendMessage', {
          chatId: item?._id,
          text: messages[0].text
        }).catch((err) => {showError('Error sending message')})
        console.log('res sendMessages', res.data)
      }, [])

  return (
    <WrapperComponent>
    <Header showTitle title={receiverName} />
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?._id,
      }}
    />
    </WrapperComponent>
  )
}

export default ChatScreen