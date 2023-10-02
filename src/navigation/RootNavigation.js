import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../utils/helper";
import { changeTheme } from "../redux/actions/appSetting";

const { AuthStack,  MainStack } = require("./MainNavigation")

const RootNavigation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (
          async () => {
            try {
              let res = await getData('isDark')
              console.log('res', res)
              !!res && dispatch(changeTheme(res))
            } catch (error) {
              console.log('error', error)
            }
          }
        )(
        )
      }, [])

    const userData = useSelector(state => state.auth);
    console.log(userData);

    const isLoggedIn = userData.isLogged
    return isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default RootNavigation;