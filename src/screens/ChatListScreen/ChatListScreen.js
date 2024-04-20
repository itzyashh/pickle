import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperComponent from '../../components/WrapperComponent'
import Header from '../../components/Header'
import { FlashList } from '@shopify/flash-list'
import LocalHost from '../../api/LocalHost'
import fontFamily from '../../assets/fonts/fontFamily'
import { moderateScale } from '../../assets/scaling'
import colors from '../../constants/colors'
import CustomImage from '../../components/CustomImage'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../navigation/routes'

const ChatListScreen = ({navigation}) => {

    const [chatList, setChatList] = useState([])
    const {isDark,language} = useSelector(state => state?.appSettings)
    const user  = useSelector(state => state?.auth.userData)


  

    useEffect(() => {
        getChatList()
    }, [])


    const onChatPress = (item) => {
        console.log('item', item)
        navigation.navigate(routes.chatScreen,{
          name: item?.type === 'group' ? item.chatName : item.users[1].userName === user.userName ? item.users[0].userName : item.users[1].userName,
          item
        })
    }

    const renderItem = ({ item }) => (
        console.log('chat list', item),
        item?.type === 'group' ? (
            <TouchableOpacity
            onPress={()=>onChatPress(item)}
            >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap:moderateScale(16),
              
            }}>
            <View style={styles.groupIcon}>
            <FontAwesomeIcon icon={faPeopleGroup} size={moderateScale(35)} color={colors.white} />
            </View>
            <View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.username}>{item.chatName}</Text>
              <Text style={[styles.activity,{color:isDark?colors.white:colors.black}]}>{' '}{item.lastMessage}</Text>
            </View>
              <Text style={[styles.time,{color:isDark?colors.grayO70:colors.gray}]}>{formatDistanceToNow(new Date(item.updatedAt),{addSuffix:true})}</Text>
            </View>
            </View>
            <View style={styles.seperator}/>
      
              
            </TouchableOpacity>
        ) : (
            <TouchableOpacity 
            onPress={()=>onChatPress(item)}
            >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap:moderateScale(16),
              
            }}>
            <CustomImage  type={'circleIcon'} />
            <View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.username}>{item.users[1].userName === user.userName ? item.users[0].userName : item.users[1].userName}</Text>
              <Text style={[styles.activity,{color:isDark?colors.white:colors.black}]}>{' '}{item.lastMessage}</Text>
            </View>
              <Text style={[styles.time,{color:isDark?colors.grayO70:colors.gray}]}>{formatDistanceToNow(new Date(item.updatedAt),{addSuffix:true})}</Text>
            </View>
            </View>
            <View style={styles.seperator}/>
      
              
            </TouchableOpacity>
        )
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
        contentContainerStyle={{padding:moderateScale(16)}}
        data={chatList}
        renderItem={renderItem}
        estimatedItemSize={100}
        />
    </WrapperComponent>
  )
}


export default ChatListScreen

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
    },
    groupIcon:{
        width:moderateScale(50),
        height:moderateScale(50),
        borderRadius:moderateScale(25),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
  })