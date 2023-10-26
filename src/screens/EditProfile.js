import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import WrapperComponent from '../components/WrapperComponent';
import Header from '../components/Header';
import strings from '../constants/lang';
import CustomImage from '../components/CustomImage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {moderateScale, verticalScale} from '../assets/scaling';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {styles} from './styles/editProfileStyle';
import CustomTextInput from '../components/CustomTextInput';
import MultiLineTextInput from '../components/MultiLineTextInput';
import CustomButton from '../components/CustomButton';

const EditProfile = () => {
  const {isDark, language} = useSelector(state => state?.appSettings);

  const [userName, setUserName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [bio, setBio] = React.useState('');


  const onSave = () => {
    console.log('save');
  };
  return (
    <WrapperComponent>
      <Header
        showTitle
        onRightPress={onSave}
        rightText={strings.SAVE}
        title={strings.EDIT_PROFILE}
      />
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <CustomImage
          imageStyle={{
            width: moderateScale(150),
            height: moderateScale(150),
            borderRadius: moderateScale(200),
            marginTop: moderateScale(50),
          }}
        />
        <View
          style={[
            styles.iconContainer,
            isDark && {backgroundColor: colors.themeLight},
          ]}>
          <FontAwesomeIcon
            icon={faPen}
            size={moderateScale(14)}
            color={isDark ? colors.white : colors.black}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <CustomTextInput
          placeholder={strings.USERNAME}
          onChangeText={setUserName}
        />
        <CustomTextInput
          placeholder={strings.FULLNAME}
          onChangeText={setFullName}
        />
        <MultiLineTextInput
          multiline
          placeholder={strings.BIO}
          onChangeText={setBio}
        />
        <CustomButton
          title={strings.CHANGE_PASSWORD}
          onPress={() => {}}
          containerStyle={{backgroundColor:' transparent ',
          borderWidth:1,
          borderColor:isDark?colors.white:colors.black,
          }}
          />
        <CustomButton
          title={strings.ADD_LINKS}
          onPress={() => {}}
          containerStyle={{backgroundColor:' transparent ',
          borderWidth:1,
          borderColor:isDark?colors.white:colors.black,
          }}
          />

      </View>
    </WrapperComponent>
  );
};

export default EditProfile;
