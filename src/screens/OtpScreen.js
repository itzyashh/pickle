import {View, Text, StyleSheet, KeyboardAvoidingView, Touchable, Pressable, Keyboard} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomTextInput from '../components/CustomTextInput';
import {moderateScale, textScale} from '../assets/scaling';
import strings from '../constants/lang';
import colors from '../constants/colors';
import fontFamily from '../../android/app/src/main/assets/fonts/fontFamily';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import OTPTextView from 'react-native-otp-textinput';
const Login = () => {

  const isDark = useSelector(state => state?.appSettings?.isDark)


  const [otpInput, setOtpInput] = useState('');

  const [timer, setTimer] = useState(59);
  const timerCallback = useCallback(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, [timer]);

  useEffect(() => {
    const timeOut = setTimeout(timerCallback, 1000)
  
    return () => {
        clearTimeout(timeOut)
    }
  }, [timerCallback])

    const OnResend = () => {
        console.log('OnResend');
        setTimer(59);
    }
  
  console.log('otpInput', otpInput);
  return (
    <WrapperComponent>
    <Pressable onPress={Keyboard.dismiss} style={{flex:1}}>
      <Header />
      <View style={styles.container}>
      <Text style={[styles.welcome,!isDark&&{color:'#292929'}]}>{strings.ENTER4DIGITOTP}</Text>
      <Text style={styles.content} >{strings.WE_ARE_HAPPY_TO_SEE_OTP}</Text>
      <View style={{gap:moderateScale(16)}}>
      <OTPTextView
          handleTextChange={(text) => setOtpInput(text)}
          containerStyle={styles.textInputContainer}
          textInputStyle={[styles.roundedTextInput,isDark&&{color:'lightgreen'}]}
          defaultValue=""
          autoFocus
          inputCount={4}
            keyboardType="numeric"
            offTintColor={colors.themeLight}
        />
      </View>
      <View
        style={{flexDirection:'row',alignItems:'center',gap:moderateScale(12),justifyContent:'flex-end'}}
      >
      <Text disabled={timer>0} onPress={OnResend} style={styles.forgot}>{strings.RESEND_OTP}</Text>
     { timer >0&&  <Text style={styles.forgot}>{`00:${timer}`}</Text>}
      </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex:0.5,
          paddingHorizontal:moderateScale(16),
          
            }}
      >

      <CustomButton fontSize={moderateScale(16)} title={strings.SUBMIT} />
      </KeyboardAvoidingView>
    </Pressable>
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
    fontFamily:fontFamily.regular,
    fontSize: textScale(16),
    color: colors.themeLight,
    alignSelf:'flex-end',
    marginVertical:moderateScale(32)
  },
  textInputContainer: {
    marginBottom: 20,
},
roundedTextInput: {
    
    borderRadius: 10,
    borderWidth: 4,
  },
});
