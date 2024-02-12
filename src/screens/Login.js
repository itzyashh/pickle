import {View, Text, StyleSheet, KeyboardAvoidingView, Touchable, Pressable, Keyboard} from 'react-native';
import React, { useState } from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomTextInput from '../components/CustomTextInput';
import {moderateScale, textScale} from '../assets/scaling';
import strings from '../constants/lang';
import colors from '../constants/colors';
import fontFamily from '../assets/fonts/fontFamily';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import validation from '../utils/validation';
import { showError } from '../utils/helper';
import LocalHost from '../api/LocalHost';
import { setUserData } from '../redux/reducers/auth';

const Login = () => {
  const isDark = useSelector(state => state?.appSettings?.isDark)
  const dispatch = useDispatch()
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('secureTextEntry', secureTextEntry);

  const isValid = () => {
    const error = validation({email,password})
    if(error){
      showError(error)
      return
    }
    return true
  }

  const onSubmit = async () => {
    setIsLoading(true)
    const isValidated = isValid()
    if(isValidated){
      try {
        const response = await LocalHost.post('/user/login',{
          email,
          password
        })
        setIsLoading(false)
        console.log('response',response.data);
        dispatch(setUserData(response.data))      
      } catch (error) {
        console.log('error',error);
        showError(error)
        setIsLoading(false)
      }
   }
  }

  return (
    <WrapperComponent>
    <Pressable onPress={Keyboard.dismiss} style={{flex:1}}>
      <Header />
      <View style={styles.container}>
      <Text style={[styles.welcome,!isDark&&{color:'#292929'}]}>{strings.WELCOME_BACK}</Text>
      <Text style={styles.content} >{strings.WE_ARE_HAPPY_TO_SEE_LOGIN}</Text>
      <View style={{gap:moderateScale(16)}}>

        <CustomTextInput
         autoCapitalize='none'
         onChangeText={setEmail} placeholder={strings.EMAIL}/>
        <CustomTextInput onChangeText={setPassword} placeholder={strings.PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
      </View>
      <Text style={styles.forgot}>{strings.FORGOT_PASSWORD}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex:0.3,
          paddingHorizontal:moderateScale(16),
          
            }}
      >

      <CustomButton
      isLoading={isLoading}
       fontSize={moderateScale(16)} onPress={onSubmit} title={strings.LOGIN} />
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
    fontSize: textScale(16),
    color: colors.themeLight,
    alignSelf:'flex-end',
    marginVertical:moderateScale(32)
  },
});
