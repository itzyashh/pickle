import { View, Text
    , TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator

} from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperComponent from '../../components/WrapperComponent'
import Header from '../../components/Header'
import { useRoute } from '@react-navigation/native'
import CustomImage from '../../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { styles } from '../styles/homeStyle'
import { moderateScale, verticalScale } from '../../assets/scaling'
import { useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { faHeart, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons'
import LocalHost from '../../api/LocalHost'
import FastImage from 'react-native-fast-image'
import CustomTextInput from '../../components/CustomTextInput'
import { showError } from '../../utils/helper'
import { s } from './PostDetails.style'
import { formatDistanceToNow } from 'date-fns'

const PostDetails = ({route}) => {
    const { item } = route.params
    const [comment, setComment] = useState('')
    const { isDark } = useSelector(state => state?.appSettings)
    const user = useSelector(state => state?.auth?.userData)
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(false)
    console.log('commentsssss',comments)
    const getPostComments = async () => {
        setCommentsLoading(true)
        try {
            const res = await LocalHost.get(`/comment/postComments`, {
                params: {
                    post_id: item?._id,
                    page: 1,
                    limit: 10
                }
            })
            console.log('res', res.data)
            setComments(res.data.result)
        } catch (error) {
            console.log('error', error)
        } finally {
            setCommentsLoading(false)
        }
    }

    const onSend = async () => {

      if (!comment) {
        showError('Please enter a comment')
        return
      }

      try {
        const res = await LocalHost.post('/comment/addComment', {
          post_id: item?._id,
          comment: comment,
          user_id: user?._id
        })
        console.log('resc', res.data)
        setComments([res.data, ...comments])
      } catch (error) {
        
      }
    }

    const renderItem = ({ item, index }) => {
      const time = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
        return (
            <View style={[s.commentContainer ,isDark && {backgroundColor:colors.C183D3D}]}>
            <View style={s.avatarContainer}>
            <CustomImage
              imageStyle={{ width: moderateScale(40), height: moderateScale(40) }}
             type={'circleIcon'} source={{ uri: 'https://i.pravatar.cc/300' }} /> 
            </View>
            <View style={s.contentBox}>
            <View style={s.userInfo}>
              <Text style={[s.name,isDark && {color:colors.white}]}
              >{item.user_id.fullName}</Text>
              <Text style={[s.time,isDark && {color:colors.whiteO70}]}>{time}</Text>
              </View>
              <Text style={[s.comment,isDark && {color:colors.white}]}>{item.comment}</Text>

            </View>

            </View>
            )
        }
    
const headerComponent = () => {
    return (
      <View style={[styles.box,{backgroundColor:'transparent',height:'auto'} ,isDark && { backgroundColor: colors.themeDark }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>

        <CustomImage type={'avatar'} source={{ uri: 'https://i.pravatar.cc/300' }} />
        <View style={{ gap: moderateScale(5) }}>
          <Text style={[styles.name, isDark && { color: '#fff' }]}>Maria Ann</Text>
          <Text style={[styles.location, isDark && { color: colors.whiteO70 }]}>Sector 1, Bucharest</Text>
        </View>
      </View>
      <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faEllipsis} size={20} />
    </View>
      <View style={[styles.postImage,{height:'auto'}]}>
      <FastImage
      style={{width:'100%',height:300}}
      source={{
        uri:item.media[0].url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
      />
      </View>



    <View style={styles.captionContainer}>

      {!!item?.description && <Text style={[styles.caption, isDark && { color: '#fff' }]}>{item?.description}</Text>}
      
      </View>

    </View>
    )
}


    const emptyComponent = () => {
        return (
          commentsLoading ? <ActivityIndicator size="large" color={colors.themeDark} /> :
            <View style={{alignItems:'center',justifyContent:'center',marginTop:verticalScale(20)}}>
            <Text
            style={{fontSize:moderateScale(20),color:isDark?colors.white:colors.black}}>No Comments</Text>
            </View>
            )
        }

    const itemSeparator = () => {
        return (
            <View style={{height:moderateScale(10)}} />
            )
        }
        


    useEffect(() => {
        getPostComments()
    }, [])


  return (
    <WrapperComponent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(5) : verticalScale(20)}>
        <Header title="Post Details" showTitle={true} />

        <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyComponent}
        ListHeaderComponent={headerComponent}
        ItemSeparatorComponent={itemSeparator}
        />
      <View style={{
         backgroundColor: 'transparent',
         flexDirection: 'row', alignItems: 'center',paddingHorizontal:moderateScale(10)}}>

        <CustomTextInput
        containerStyle={{flex:1}}
          style={{ width: '85%'}}
          onChangeText={(text) => setComment(text)}
         placeholder="Add a comment" />
         <TouchableOpacity
          onPress={onSend}
          style={{transform: [{ rotate: '35deg'}]}}>
         <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faLocationArrow} size={50} />
          </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </WrapperComponent>
  )
}

export default PostDetails