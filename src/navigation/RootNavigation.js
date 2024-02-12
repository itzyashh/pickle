import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../utils/helper";
import { setLanguage, setTheme } from "../redux/reducers/appSettings";

const { AuthStack,  MainStack } = require("./MainNavigation")

const RootNavigation = () => {
  const dispatch = useDispatch()
  const getTheme = async () => {
    try {
      let theme = await getData('isDark')
      console.log('asfasfsdjkfjsdfsdjkfj',theme) 
      theme == 'true' ? dispatch(setTheme(true)) : dispatch(setTheme(false))
     
    }
    catch (e) {
      console.log(e)
    }
  }
  const getLanguage = async () => {
    try{
      let lang = await getData('language')
      console.log('lang',lang)
      setLanguage(lang)
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    getTheme()
    getLanguage()
  }
  , [])
   

    const userData = useSelector(state => state.auth);
    console.log('asdasdasdadasd',userData?.userData?.token)

    const isLoggedIn = userData.userData?.token
    // const isLoggedIn = true
    return !!isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default RootNavigation;