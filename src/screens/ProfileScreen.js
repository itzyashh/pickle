import {Button, Dimensions, Pressable, RefreshControl, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomImage from '../components/CustomImage';
import {styles} from './styles/ProfileStyle';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../constants/colors';
import {moderateScale, verticalScale} from '../assets/scaling';
import {FlashList} from '@shopify/flash-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../navigation/routes';
import { resetUserData, setUserData } from '../redux/reducers/auth';
import LocalHost from '../api/LocalHost';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const onEdit = () => {
    navigation.navigate(routes.editProfile)
  }
  const {isDark, language} = useSelector(state => state?.appSettings);
  const {width, height} = Dimensions.get('window');
  const [posts, setPosts] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [refreshing, setRefreshing] = React.useState(false);

  const userData = useSelector(state => state?.auth?.userData);
  console.log('userDatsa',userData)

  useEffect(() => {
    getMyPosts()
  } ,[])

  const onRefresh = () => {
      setRefreshing(true);
      getMyPosts()
      setTimeout(() => {
        setRefreshing(false);
      }, 3000);
    }


  const onLogout = () => {
    dispatch(resetUserData())
  };

  const getMyPosts = async () => {
    try {
      const response = await LocalHost.get('/post/myPosts',{
        params:{
          user_id:userData?._id,
          page:1,
          limit:12
        }
      })
      console.log('responseasdas',response.data.result)
      setPosts(response?.data?.result ?? []);
    } catch (error) {
      console.log('error',error)
    }
  }

  const listHeader = () => {
    return (
      <View style={{marginBottom:verticalScale(16)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(15),
          }}>
          <CustomImage type={'avatarLarge'} source={{uri:userData?.profileImage}} />
          <View>
            <Text
              style={[
                styles.username,
                {color: isDark ? colors.white : colors.black},
              ]}>
              {userData?.fullName}
            </Text>
            <Text
              style={[
                styles.email,
                {color: isDark ? colors.gray : colors.black},
              ]}>
              {userData?.email}
            </Text>
          </View>
          <TouchableOpacity onPress={onEdit}>
          <FontAwesomeIcon icon={faPenToSquare} size={moderateScale(20)} color={isDark?colors.white:colors.black} />
          </TouchableOpacity>
          <Button title={'Logout'} onPress={onLogout} />
        </View>
        <Text
          style={[styles.bio, {color: isDark ? colors.white : colors.black}]}>
          "🌟 Exploring life, one picture at a time ✨ | Adventure seeker 🌍 |
          Coffee enthusiast ☕ | Dreamer | Making memories | #Wanderlust 🗺️ |
          Living my best life 💫"
        </Text>
        <View style={[styles.dashboard,{backgroundColor:isDark?colors.gray:colors.grayO70}]}>
          <Text style={[styles.dashboardTitle,{color:!isDark&&colors.gray}]}>Dashboard</Text>
          <Text style={[styles.dashboardText]}>1k followers reached in last 30 days</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item,index}) => {
    return (
      <Pressable
      onPress={()=>navigation.navigate(routes.postDetails,{item})}
      style={{borderWidth:1,}}>

{!!item?.media && <CustomImage imageStyle={{width:width/3,height:moderateScale(200)}} resizeMode={'cover'}
        source={{uri:item?.media[0]?.url}} />}


      </Pressable>
    );
  };

  return (
    <WrapperComponent>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <FlashList
          ListHeaderComponent={listHeader}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item,index) => item.id || String(index)}
          numColumns={3}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </WrapperComponent>
  );
};

export default ProfileScreen;
