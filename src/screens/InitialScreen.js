import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {routes} from '../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/reducers/auth';
import WrapperComponent from '../components/WrapperComponent';
import { WithLocalSvg} from 'react-native-svg';
import imagePath from '../constants/imagePath';
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily';
import colors from '../constants/colors';
import strings from '../constants/lang';
import CustomButton from '../components/CustomButton';
import { height, moderateScale, moderateScaleVertical } from '../assets/scaling';
import CustomModal from '../components/CustomModal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faGear, faLanguage, faSliders } from '@fortawesome/free-solid-svg-icons';
import { setLanguage, setTheme } from '../redux/reducers/appSettings';
 InitialScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDark,language} = useSelector(state => state?.appSettings)
  const [isVisible, setIsVisible] = useState(false);

  const onLogin = () => {
    dispatch(setUserData({isLogged: true}));
  };

  const onLanguageIconPress = () => {
    setIsVisible(true)
  }

  const goToTerms = () => {
    console.log('goToTerms');
  };
  const goToPrivacyPolicy = () => {
    console.log('goToPrivacyPolicy');
  };
  const goToSignUp = () => {
    navigation.navigate(routes.signUp);
  };
  return (
    <WrapperComponent>
      <View style={styles.container}>
      <TouchableOpacity onPress={onLanguageIconPress} style={[styles.iconContainer,!isDark&&{borderWidth:1,borderColor:colors.themeLight}]}>
        <FontAwesomeIcon icon={faSliders} size={moderateScale(18)} onPress={()=>setIsVisible(true)} />
      </TouchableOpacity>
      <View>
        <WithLocalSvg
          width={moderateScale(54)}
          height={moderateScale(62)}
          asset={imagePath.logo}/>
      </View>
        <View>
          <Text style={[styles.text,!isDark&&{color:'#292929'}]}>
            {strings.BY_CLICKING_LOGIN_YOU_AGREE_TO_OUR}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text onPress={goToTerms} style={[styles.text, styles.linkText,!isDark&&{color:'#292929'}]}>
              {strings.TERMS_OF_SERVICE}{' '}
            </Text>
            <Text style={[styles.text,!isDark&&{color:'#292929'}]}>{strings.AND}</Text>
            <Text
              onPress={goToPrivacyPolicy}
              style={[styles.text, styles.linkText,!isDark&&{color:'#292929'}]}>
              {' '}
              {strings.PRIVACY_POLICY}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: moderateScale(20),}}
        >
          
          <CustomButton icon='Phone' primary title={strings.LOG_IN_WITH_PHONE_NUMBER} onPress={()=>navigation.navigate(routes.login)}  />
          <Text style={[styles.text,{textAlign:'center',marginVertical:moderateScaleVertical(20)},!isDark&&{color:'#292929'}]} >{strings.OR}</Text>
          <View
            style={{
              gap: 15,
              
            }}
          >

          <CustomButton title={strings.LOG_IN_WITH_GOOGLE} icon='Google'  />
          <CustomButton title={strings.LOG_IN_WITH_FACEBOOK} icon='Facebook'   />
          <CustomButton title={strings.LOG_IN_WITH_APPLE} icon='Apple'  />
          </View>
          
        </View>
        <View
          style={{flexDirection: 'row', gap: 5}}
        >
          <Text style={[styles.text,!isDark&&{color:'#292929'}]}>{strings.NEW_HERE}</Text>
          <Text onPress={goToSignUp} style={[styles.linkText,{color:'blue'}]} >{strings.SIGN_UP}</Text>
        </View>
      </View>
      <CustomModal isVisible={isVisible}
      onBackdropPress={()=>setIsVisible(false)}
        style={{
          justifyContent:'flex-end',margin:0
        }}
       >
        <View style={{backgroundColor:colors.white
        ,minHeight:moderateScaleVertical(height/4),
        borderTopLeftRadius:moderateScale(20),
        borderTopRightRadius:moderateScale(20),
        padding:moderateScale(20),
        }}>
          <Text style={styles.headerStyle}>Change Language</Text>
          <TouchableOpacity
            onPress={() => dispatch(setLanguage('en'))}
            style={{
              flexDirection: 'row',
              gap: moderateScale(10),
              alignItems:'center',
            }}
          >

          <Text style={styles.langText}>English</Text>
       { language=='en'&&   <FontAwesomeIcon icon={faCircleCheck} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setLanguage('ar'))}
            style={{
              flexDirection: 'row',
              gap: moderateScale(10),
              alignItems:'center',
            }}
          >

          <Text style={styles.langText}>Arabic</Text>
       { language=='ar'&&   <FontAwesomeIcon icon={faCircleCheck} />}
            </TouchableOpacity>
          <Text style={styles.headerStyle}>Change Theme</Text>
          <TouchableOpacity
            onPress={() => dispatch(setTheme(true))}
            style={{
              flexDirection: 'row',
              gap: moderateScale(10),
              alignItems:'center',
            }}
          >

          <Text style={styles.langText}>Dark</Text>
       { isDark &&   <FontAwesomeIcon icon={faCircleCheck} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setTheme(false))}
            style={{
              flexDirection: 'row',
              gap: moderateScale(10),
              alignItems:'center',
            }}
          >

          <Text style={styles.langText}>Light</Text>
       { !isDark&&<FontAwesomeIcon icon={faCircleCheck} />}
            </TouchableOpacity>
        </View>
      </CustomModal>
    </WrapperComponent>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  text: {
    fontFamily: fontFamily.regular,
    color: colors.white,
    fontSize: moderateScale(15),
  },
  linkText: {
    fontFamily: fontFamily.semiBold,
    color: colors.white,
  },
  iconContainer:{
    position:'absolute',
    top:moderateScaleVertical(0),
    right:moderateScale(20),
    zIndex:100,
    height:moderateScale(40),
    borderRadius:moderateScale(20),
    backgroundColor:colors.themeLight,
    width:moderateScale(40),
    justifyContent:'center',
    alignItems:'center',
  },
  headerStyle:{
    fontFamily:fontFamily.semiBold,
    fontSize:moderateScale(20),
    marginBottom:moderateScaleVertical(10)
  },
  langText:{
    fontFamily:fontFamily.regular,
    fontSize:moderateScale(15),
    marginBottom:moderateScaleVertical(5)
  }
});
