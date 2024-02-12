import {View, Text, StyleSheet, Pressable, Keyboard, KeyboardAvoidingView} from 'react-native';
import React, { useState } from 'react';
import WrapperComponent from '../components/WrapperComponent';
import CustomTextInput from '../components/CustomTextInput';
import {moderateScale, textScale} from '../assets/scaling';
import strings from '../constants/lang';
import colors from '../constants/colors';
import fontFamily from '../assets/fonts/fontFamily';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { routes } from '../navigation/routes';
import validation from '../utils/validation';
import { showError } from '../utils/helper';
import axios from 'axios';

const Login = ({navigation}) => {
  const isDark = useSelector(state => state?.appSettings?.isDark)

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const isValid = () => {
    const error = validation({
      email,
      password,
      username,
      fullname
    })
    if(error){
      showError(error)
      return
    }
    if(password!==confirmPassword){
      showError(strings.PASSWORD_NOT_MATCH)
      return
    }
    return true
  }

  const handleSignUp = async () => {
    Keyboard.dismiss();


    if(isValid()){
      setIsLoading(true)
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/signup',
        data: {
          fullName:fullname,
          email,
          password,
          userName:username
        }
      }).then((res) => {
        console.log('res++',res);
        setIsLoading(false)
        navigation.navigate(routes.otp,res.data.result, email)
      }).catch((error) => {
        setIsLoading(false)
        console.log(error)
        showError(error?.response?.data?.message ?? error?.message)
      })
    }
    
  }

  return (
    <WrapperComponent>
    <KeyboardAwareScrollView>
      <Header />
      <View style={styles.container}>
      <Text style={[styles.welcome,!isDark&&{color:'#292929'}]}>{strings.WELCOME_BACK}</Text>

      <Text style={styles.content} >{strings.WE_ARE_HAPPY_TO_SEE_LOGIN}</Text>
      <View style={{gap:moderateScale(16)}}>
        <CustomTextInput autoCorrect={false} autoCapitalize='none' onChangeText={setUsername} placeholder={strings.USERNAME}/>
        <CustomTextInput autoCapitalize='words' autoCorrect={false} onChangeText={setFullname} placeholder={strings.FULLNAME}/>
        <CustomTextInput autoCapitalize='none' onChangeText={setEmail} placeholder={strings.EMAIL}/>
        <CustomTextInput onChangeText={setPassword} placeholder={strings.PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
        <CustomTextInput onChangeText={setConfirmPassword} placeholder={strings.CONFIRM_PASSWORD} secureTextEntry={secureTextEntry} toggleButton onTogglePress={()=>setSecureTextEntry(!secureTextEntry)} />
        <Text style={{color:'red'}}>{password!==confirmPassword && confirmPassword.length>0
        ?strings.PASSWORD_NOT_MATCH:''}</Text>
      </View>
      <Text style={[styles.forgot,!isDark&&{color:'#292929'}]}>{strings.FORGOT_PASSWORD}</Text>
      </View>
      <View
        style={{
          flex:0.3,
          paddingHorizontal:moderateScale(16),
          
            }}
      >

      <CustomButton isLoading={isLoading} onPress={handleSignUp} primary fontSize={moderateScale(16)}  title={strings.SIGN_UP} />
      </View>
    </KeyboardAwareScrollView>
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
