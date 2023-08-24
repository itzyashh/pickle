import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePost from '../screens/CreatePost';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {default: Login} = require('../screens/Login'); //TODO try just Login
const {default: SignUp} = require('../screens/SignUp');
const {routes} = require('./routes');
const {default: InitialScreen} = require('../screens/InitialScreen');
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faCirclePlus, faHome, faHouse, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import SearchScreen from '../screens/SearchScreen';
import Notification from '../screens/Notification';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
     <Tab.Screen name={routes.home} component={HomeScreen}
        options={{
            tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faHouse}  color={focused ? 'blue' : 'black'} size={20} />
        }}
       />
       <Tab.Screen name={routes.search} component={SearchScreen}
        options={{
            tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faSearch}  color={focused ? 'blue' : 'black'} size={20} />
        }}
         />
      <Tab.Screen name={routes.createPost} component={CreatePost}
        options={{
            tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faCirclePlus}  color={focused ? 'blue' : 'black'} size={20} />
        }}
       />
       <Tab.Screen name={routes.notifications} component={Notification}
        options={{
            tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faBell}  color={focused ? 'blue' : 'black'} size={20} />
        }}
         />
         <Tab.Screen name={routes.profile} component={ProfileScreen}
        options={{
            tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faUser}  color={focused ? 'blue' : 'black'} size={20} />
        }}
         />


    </Tab.Navigator>
  );
};

export {MainStack, AuthStack};
