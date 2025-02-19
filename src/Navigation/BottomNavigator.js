import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/Home/Home';
import Notifications from '../Screens/Home/Notifications';
import MyDiary from '../Screens/Home/MyDiary';
import Profile from '../Screens/Home/Profile';
import DiaryStack from './DiaryStack/DiaryStack';

const Tab = createBottomTabNavigator();
const isIOS=Platform.OS==="ios";
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { 
          backgroundColor: '#0537DE', // Blue background color
          height: 80,
         
          paddingBottom:isIOS ? 50 : 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: 'white',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'MyDiary') {
            // Use an image for My Diary instead of an icon
            return (
              <Image
                source={require('./../Asssets/Images/diary.png')}
                style={{ 
                  width: size, 
                  height: size, 
                  tintColor: color 
                }}
                resizeMode="contain"
              />
            );
          }

          // For other tabs, use icons
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'bell' : 'bell-outline'; // Changed to bell icon
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
     
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="MyDiary" 
        component={DiaryStack}
        options={{
          tabBarLabel: 'My Diary'
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;




