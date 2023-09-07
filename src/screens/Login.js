import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomTextInput from '../components/CustomTextInput';
import {moderateScale, textScale} from '../assets/scaling';
import strings from '../constants/lang';
import colors from '../constants/colors';
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  console.log('secureTextEntry', secureTextEntry);
  return (
    <WrapperComponent>
      <View style={styles.container}>
      <Text style={styles.welcome}>{strings.WELCOME_BACK}</Text>
      <Text style={styles.content} >{strings.WE_ARE_HAPPY_TO_SEE}</Text>
      <View style={{gap:moderateScale(16)}}>

        <CustomTextInput placeholder={strings.EMAIL}/>
        <CustomTextInput placeholder={strings.PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
      </View>
      <Text style={styles.forgot}>{strings.FORGOT_PASSWORD}</Text>
      </View>
    </WrapperComponent>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:moderateScale(16),
  },
  welcome: {
    marginTop:moderateScale(32),
    fontFamily:fontFamily.bold,
    fontSize: textScale(32),
    fontWeight: 'bold',
    color: colors.white,
    marginBottom:moderateScale(5)
  },
  content: {
    fontFamily:fontFamily.semiBold,
    fontSize: textScale(16),
    color: colors.gray,
    marginBottom:moderateScale(52)
  },
  forgot: {
    fontSize: textScale(16),
    color: colors.themeLight,
    alignSelf:'flex-end',
    marginVertical:moderateScale(32)
  },
});
