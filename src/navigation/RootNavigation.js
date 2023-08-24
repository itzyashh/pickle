const { AuthStack,  MainStack } = require("./MainNavigation")

const RootNavigation = () => {
    const isLoggedIn = true; // TODO: remove this when we have a login screen
    return isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default RootNavigation;