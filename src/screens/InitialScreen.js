import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {routes} from '../navigation/routes';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/reducers/auth';
import WrapperComponent from '../components/WrapperComponent';
import Svg, {Image as SvgImage, WithLocalSvg} from 'react-native-svg';
import imagePath from '../constants/imagePath';
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily';
import colors from '../constants/colors';
import strings from '../constants/lang';
import CustomButton from '../components/CustomButton';

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

  return (
    <WrapperComponent>
      <View style={styles.container}>
        <WithLocalSvg
          width={54}
          height={62}
          asset={imagePath.logo}></WithLocalSvg>
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
        <View>
          
          <CustomButton primary title={strings.LOG_IN_WITH_PHONE_NUMBER}  />
          <Text style={[styles.text,{textAlign:'center',marginVertical:20}]} >{strings.OR}</Text>
          <View
            style={{
              gap: 15,
            }}
          >

          <CustomButton title={strings.LOG_IN_WITH_GOOGLE}  />
          <CustomButton title={strings.LOG_IN_WITH_FACEBOOK}  />
          <CustomButton title={strings.LOG_IN_WITH_APPLE}  />
          </View>
          
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
