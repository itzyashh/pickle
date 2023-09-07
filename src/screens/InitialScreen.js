import {View, Text, StyleSheet} from 'react-native';
import {routes} from '../navigation/routes';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/reducers/auth';
import WrapperComponent from '../components/WrapperComponent';
import { WithLocalSvg} from 'react-native-svg';
import imagePath from '../constants/imagePath';
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily';
import colors from '../constants/colors';
import strings from '../constants/lang';
import CustomButton from '../components/CustomButton';
import { moderateScale, moderateScaleVertical } from '../assets/scaling';

const InitialScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(setUserData({isLogged: true}));
  };

  const goToTerms = () => {
    console.log('goToTerms');
  };
  const goToPrivacyPolicy = () => {
    console.log('goToPrivacyPolicy');
  };
  const goToSignUp = () => {
    console.log('goToSignUp');
  };
  return (
    <WrapperComponent>
      <View style={styles.container}>
      <View>
        <WithLocalSvg
          width={moderateScale(54)}
          height={moderateScale(62)}
          asset={imagePath.logo}/>
      </View>
        <View>
          <Text style={styles.text}>
            {strings.BY_CLICKING_LOGIN_YOU_AGREE_TO_OUR}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text onPress={goToTerms} style={[styles.text, styles.linkText]}>
              {strings.TERMS_OF_SERVICE}{' '}
            </Text>
            <Text style={styles.text}>{strings.AND}</Text>
            <Text
              onPress={goToPrivacyPolicy}
              style={[styles.text, styles.linkText]}>
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
          <Text style={[styles.text,{textAlign:'center',marginVertical:moderateScaleVertical(20)}]} >{strings.OR}</Text>
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
          <Text style={styles.text}>{strings.NEW_HERE}</Text>
          <Text onPress={goToSignUp} style={[styles.linkText,{color:'blue'}]} >{strings.SIGN_UP}</Text>
        </View>
      </View>
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
    
  },
  linkText: {
    fontFamily: fontFamily.semiBold,
    color: colors.white,
  },
});
