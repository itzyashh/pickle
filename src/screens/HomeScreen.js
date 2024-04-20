import { Pressable, RefreshControl,  Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import strings from '../constants/lang'
import WrapperComponent from '../components/WrapperComponent'
import { FlashList } from '@shopify/flash-list'
import { styles } from './styles/homeStyle'
import CustomImage from '../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faC, faComment, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { moderateScale, verticalScale } from '../assets/scaling'
import LocalHost from '../api/LocalHost'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import { routes } from '../navigation/routes'
import Header from '../components/Header'
import socketService from '../utils/socketService'

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



const HomeScreen = ({navigation}) => {

  const { isDark, language } = useSelector(state => state?.appSettings)
  const user  = useSelector(state => state?.auth.userData)
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
    socketService.initiliazeSocket()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchPosts()
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }

  const onPressLike = async (item,index) => {
    const user_id = user?._id
    const post_id = item?._id
    try {
      const res = await LocalHost.post('/like/likeDislike', {
        user_id,
        post_id
      })

      const clonePosts = [...posts]
      clonePosts[index].isLiked = item.isLiked ? false : true
      clonePosts[index].likeCount = item.isLiked ? clonePosts[index].likeCount + 1 : clonePosts[index].likeCount - 1
      setPosts(clonePosts)
      console.log('res', res.data);
    } catch (error) {
      console.error('error', error);
    }
  }

  const onPressMessage = async (item) => {
    try {

      const res = await LocalHost.post('/chat/createPrivateChat',{
        userId : item?.user?._id,
      })

      
      console.log('res', res.data);
    } catch (error) {
      
    }
  }

  const fetchPosts = async () => {
    console.log('fetching posts');
    try {
      const response = await LocalHost.get('/post/getPosts', {
        params: {
          page: 1,
          limit: 50,
          user_id: user?._id
        }
      })

      console.log('response all posts', response.data);
      setPosts(response?.data?.result)
    } catch (error) {
      console.log('error', error);
    }
  }

  const renderItem = useCallback(({ item,index }) => (
    <Pressable 
     onPress={()=>navigation.navigate(routes.postDetails,{item})}
     style={styles.box}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>

          <CustomImage type={'avatar'} source={{ uri: 'https://i.pravatar.cc/300' }} />
          <View style={{ gap: moderateScale(5) }}>
            <Text  style={[styles.name, isDark && { color: '#fff' }]}>{item?.user?.fullName}</Text>
            <Text onPress={()=>onPressMessage(item)} style={[styles.location, isDark && { color: colors.whiteO70 }]}>Sector 1, Bucharest</Text>
          </View>
        </View>
        <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faEllipsis} size={20} />
      </View>
      <View style={styles.postImage}>

        <CustomImage
          imageStyle={{ borderRadius: moderateScale(10) }}
          type={'full'} source={{ uri:item.media[0].url }} />
      </View>
      <View style={styles.captionContainer}>

        {!!item?.description && <Text style={[styles.caption, isDark && { color: '#fff' }]}>{item?.description}</Text>}
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: verticalScale(10),
        }}>
          <View
            style={{
              flexDirection: 'row',
              gap: moderateScale(20),
            }}
          >
            <Text style={[styles.likeAndComment, { color: isDark ? colors.white : colors.black }]}>{`Comments: ${item?.commentCount}`}</Text>
            <Text style={[styles.likeAndComment, { color: isDark ? colors.white : colors.black }]}>{`Likes: ${item?.likeCount}`}</Text>
          <TouchableOpacity onPress={()=>onPressLike(item,index)}>
      {  item.isLiked && <FontAwesomeIcon color={isDark ? '#98002E' :'#e31b23'} icon={faHeart} size={20} />}
      {  !item.isLiked && <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faHeartOutline} size={20} />}
          </TouchableOpacity>
          </View>
          <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faShare} size={20} />
        </View>
      </View>

    </Pressable>
  )
    , [posts])



  return (
    <WrapperComponent style={styles.container}>
    <Header backBtnDisabled
    rightIcon={faComment}
    onRightPress={()=>navigation.navigate(routes.chatList)}
     />
      <FlashList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={<Text>{strings.NO_POSTS}</Text>}
        renderItem={renderItem}
        estimatedItemSize={500}
        keyExtractor={item => item._id}
      />
    </WrapperComponent>
  )
}

export default HomeScreen

