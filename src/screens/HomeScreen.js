import { RefreshControl,  Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import strings from '../constants/lang'
import WrapperComponent from '../components/WrapperComponent'
import { FlashList } from '@shopify/flash-list'
import { styles } from './styles/homeStyle'
import CustomImage from '../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { moderateScale, verticalScale } from '../assets/scaling'
import LocalHost from '../api/LocalHost'

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

  const { isDark, language } = useSelector(state => state?.appSettings)
  const [refreshing, setRefreshing] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchPosts()
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }


  const fetchPosts = async () => {
    console.log('fetching posts');
    try {
      const response = await LocalHost.get('/post/getPosts', {
        params: {
          page: 1,
          limit: 50
        }
      })

      console.log('response all posts', response.data);
      setPosts(response?.data?.result)
    } catch (error) {
      console.log('error', error);
    }
  }

  const renderItem = useCallback(({ item }) => (
    <View style={styles.box}>
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
          </View>
          <FontAwesomeIcon color={isDark ? colors.white : colors.black} icon={faShare} size={20} />
        </View>
      </View>

    </View>
  )
    , [])



  return (
    <WrapperComponent style={styles.container}>
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

