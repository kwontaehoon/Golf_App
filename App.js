import React from 'react'
import {View, Text, StyleSheet, LogBox} from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
// import Home from './component/Home/Home_Page'
import HomeMain from './component/Home/Main'
import Reservation from './component/Reservation/Reservation_Page'
import Search from './component/Search/Search_Page'
import MyPage from './component/MyPage/MyPage_Page'
LogBox.ignoreAllLogs();

const App = () => {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle:{ headerheight: 60, position: 'absolute', paddindgBottom: 7}}}>
        <Tab.Screen name="Home" component={HomeMain} options={{tabBarIcon: () => (<Icon name='home' size={23}></Icon>)}}/>
        <Tab.Screen name="Reservation" component={Reservation} options={{tabBarIcon: () => (<Icon name='calendar-o' size={23}></Icon>)}}/>
        <Tab.Screen name="Search" component={Search} options={{tabBarIcon: () => (<Icon name='search' size={23}></Icon>)}}/>
        <Tab.Screen name="MyPage" component={MyPage} options={{tabBarIcon: () => (<Icon name='user' size={23}></Icon>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App