import {View, Text, TouchableOpacity, Modal} from 'react-native';
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
import ReactNativeModal from 'react-native-modal';
import CustomModal from '../components/CustomModal';

const EditProfile = () => {
  const {isDark, language} = useSelector(state => state?.appSettings);

  const [userName, setUserName] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [changePasswordModal, setChangePasswordModal] = React.useState(false);
  const [addLinksModal, setAddLinksModal] = React.useState(false);



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
          onPress={() => setChangePasswordModal(true)}
          containerStyle={{backgroundColor:' transparent ',
          borderWidth:1,
          borderColor:isDark?colors.white:colors.black,
          }}
          />
        <CustomButton
          title={strings.ADD_LINKS}
          onPress={() => setAddLinksModal(true)}
          containerStyle={{backgroundColor:' transparent ',
          borderWidth:1,
          borderColor:isDark?colors.white:colors.black,
          }}
          />
        

      </View>
      <CustomModal
        style={{margin:0,justifyContent:'flex-end'}}
        isVisible={changePasswordModal}
        avoidKeyboard
        onBackdropPress={()=>setChangePasswordModal(false)}
        key={'1'}
        >
      
          <View style={[styles.modalView,{backgroundColor:isDark?colors.theme:colors.themeLight}]}>
          <View style={{gap:verticalScale(10),marginBottom:verticalScale(15)}}>

          <CustomTextInput onChangeText={setPassword} placeholder={strings.OLD_PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
        <CustomTextInput onChangeText={setPassword} placeholder={strings.CONFIRM_PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
          </View>

          <CustomButton title={strings.CHANGE_PASSWORD} onPress={()=>{}}/>
          </View>
        </CustomModal>
      <CustomModal
        style={{margin:0,justifyContent:'flex-end'}}
        isVisible={addLinksModal}
        avoidKeyboard
        onBackdropPress={()=>setAddLinksModal(false)}
        key={'2'}
        >
      
          <View style={[styles.modalView,{backgroundColor:isDark?colors.theme:colors.themeLight}]}>
          <View style={{gap:verticalScale(10),marginBottom:verticalScale(15)}}>

          <CustomTextInput onChangeText={setPassword} placeholder={strings.OLD_PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
        <CustomTextInput onChangeText={setPassword} placeholder={strings.CONFIRM_PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
          </View>

          <CustomButton title={strings.CHANGE_PASSWORD} onPress={()=>{}}/>
          </View>
        </CustomModal>
    </WrapperComponent>
  );
};

export default EditProfile;
