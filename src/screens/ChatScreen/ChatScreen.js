import { View, Text, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import WrapperComponent from '../../components/WrapperComponent'
import Header from '../../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux';
import { getMessage } from '@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware'
import LocalHost from '../../api/LocalHost'
import { showError } from '../../utils/helper'
import socketService from '../../utils/socketService'


const limit = 12

const ChatScreen = ({navigation, route}) => {
    const item = route.params.item
    const receiverName = route.params.name
    console.log('params', item)
    const user  = useSelector(state => state?.auth.userData)

    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
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

    const leaveRoom = () => {
      socketService.emit('leave room', item?._id)
      navigation.goBack()
    }

    useEffect(() => {

      socketService.emit('join room', item?._id)

      socketService.on('chat message', (data) => {
        console.log('catch data from server', data)
        // Alert.alert('New message', data.text)
        // return

        if (data.user._id === user?._id) return

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, data),
        )
      })

      return () => {
        socketService.removeListener('chat message')
        socketService.emit('leave room', item?._id)
      }
    }, [])
  

    const getMessages = async () => {
      const res = await LocalHost.get(`/message/myMessages?chatId=${item?._id}&page=${page}&limit=${limit}`)
      console.log('res getmessages', res.data)
      setMessages(res.data.data)
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

        socketService.emit('chat message',{
          ...res.data.data,
          user: {
            _id: user?._id,
            name: user?.userName,
            // avatar: user?.avatar
          }
        })

        console.log('res sendMessages', res.data)
      }, [])

  return (
    <WrapperComponent>
    <Header 
    onBackPress={leaveRoom}
    showTitle title={receiverName} />
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