import HomeScreen from '../screens/HomeScreen';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {default: Login} = require('../screens/Login'); //TODO try just Login
const {default: SignUp} = require('../screens/SignUp');
const {routes} = require('./routes');
const {default: InitialScreen} = require('../screens/InitialScreen');

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.initial} component={InitialScreen} />
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signUp} component={SignUp} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export {MainStack, AuthStack};
