import { useSelector } from "react-redux";

const { AuthStack,  MainStack } = require("./MainNavigation")

const RootNavigation = () => {

    const userData = useSelector(state => state.auth);
    console.log(userData);

    const isLoggedIn = userData.isLogged
    return isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default RootNavigation;