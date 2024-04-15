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
import ProfileScreen from '../screens/ProfileScreen';
import OtpScreen from '../screens/OtpScreen';
import NotificationScreen from '../screens/NotificationScreen';
import EditProfile from '../screens/EditProfile';
import Links from '../screens/Links';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import AddPost from '../screens/AddPost';
import PostDetails from '../screens/PostDetails/PostDetails';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
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
      <Stack.Screen name={routes.otp} component={OtpScreen} />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  const {isDark,language} = useSelector(state => state?.appSettings)

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: isDark ? colors.themeLight : colors.theme,
      }
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
          tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faCirclePlus}  color={focused ? 'red' : 'red'} size={20} />,
          unmountOnBlur: true
      }}
     />
     <Tab.Screen name={routes.notifications} component={NotificationScreen}
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
}

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen name={routes.tabStack} component={TabStack}  />
    <Stack.Screen name={routes.editProfile} component={EditProfile} />
    <Stack.Screen name={routes.links} component={Links} />
    <Stack.Screen name={routes.addPost} component={AddPost} />
    <Stack.Screen name={routes.postDetails} component={PostDetails} />
    <Stack.Screen name={routes.chat} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export {MainStack, AuthStack};
