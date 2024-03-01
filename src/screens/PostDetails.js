import { View, Text
    , TouchableOpacity,
    FlatList

} from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperComponent from '../components/WrapperComponent'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import CustomImage from '../components/CustomImage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { styles } from './styles/homeStyle'
import { moderateScale, verticalScale } from '../assets/scaling'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons'
import LocalHost from '../api/LocalHost'
import FastImage from 'react-native-fast-image'

const PostDetails = ({route}) => {
    const { item } = route.params

    const { isDark } = useSelector(state => state?.appSettings)
    const [comments, setComments] = useState([])
    const getPostComments = async () => {
        try {
            const res = await LocalHost.get(`/comment/postComments`, {
                params: {
                    post_id: item?._id,
                    page: 1,
                    limit: 10
                }
            })
            setComments(res.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
            <Text>asdas</Text>
            </View>
            )
        }
    
    const emptyComponent = () => {
        return (
            <View style={{alignItems:'center',justifyContent:'center',marginTop:verticalScale(20)}}>
            <Text>No Comments</Text>
            </View>
            )
        }


    useEffect(() => {
        getPostComments()
    }, [])


  return (
    <WrapperComponent>
        <Header title="Post Details" showTitle={true} />
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
        <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        

        />
      </View>
      </View>
    </WrapperComponent>
  )
}

export default PostDetails