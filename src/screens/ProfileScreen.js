import {Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomImage from '../components/CustomImage';
import {styles} from './styles/ProfileStyle';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';
import {moderateScale, verticalScale} from '../assets/scaling';
import {FlashList} from '@shopify/flash-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../navigation/routes';

const ProfileScreen = ({navigation}) => {
  const onEdit = () => {
    navigation.navigate(routes.editProfile)
  }
  const {isDark, language} = useSelector(state => state?.appSettings);
  const {width, height} = Dimensions.get('window');
  const listHeader = () => {
    return (
      <View style={{marginBottom:verticalScale(16)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(15),
          }}>
          <CustomImage type={'avatarLarge'} />
          <View>
            <Text
              style={[
                styles.username,
                {color: isDark ? colors.white : colors.black},
              ]}>
              John Doe
            </Text>
            <Text
              style={[
                styles.email,
                {color: isDark ? colors.gray : colors.black},
              ]}>
              john@email.com
            </Text>
          </View>
          <TouchableOpacity onPress={onEdit}>
          <FontAwesomeIcon icon={faPenToSquare} size={moderateScale(20)} color={isDark?colors.white:colors.black} />
          </TouchableOpacity>
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
      <TouchableOpacity style={{borderWidth:1,}}>

      <CustomImage imageStyle={{width:width/3,height:moderateScale(200)}} resizeMode={'cover'}/>

  </TouchableOpacity>
    );
  };

  return (
    <WrapperComponent>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <FlashList
          ListHeaderComponent={listHeader}
          data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]}
          renderItem={renderItem}
          keyExtractor={item => item.id || String(index)}
          numColumns={3}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </WrapperComponent>
  );
};

export default ProfileScreen;
