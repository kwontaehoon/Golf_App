import React from 'react'
import {View, Text, StyleSheet, LogBox} from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './component/Home/Home_Page'
import HomeMain from './component/Home/Main'
import Store from './component/Home/Store'
import Write from './component/Home/Write'
import Reservation from './component/Home/Reservation'
import Album from './component/Home/Album'
import Board from './component/Home/Board'
import Search from './component/Search/Search_Page'
import MyPage from './component/MyPage/MyPage_Page'
import MyPageMain from './component/MyPage/Main'

LogBox.ignoreAllLogs();

const App = () => {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle:{ height: 60, position: 'absolute', paddindgBottom: 7}}}>

        <Tab.Screen name="HomeMain" options={{tabBarIcon: () => (<Icon name='home' size={23}/>)}}>
          {()=>(
               <Stack.Navigator >
                    <Stack.Screen 
                        name="HomeMain"
                        component={HomeMain}
                        options={{headerShown: false}}
                        />
                    <Stack.Screen 
                        name="검색"
                        component={Store}
                        />
                    <Stack.Screen 
                        name="실시간 예약"
                        component={Reservation}
                        />
                    <Stack.Screen 
                        name="앨범"
                        component={Album}
                        />
                    <Stack.Screen 
                        name="게시판"
                        component={Board}
                      />
                    <Stack.Screen 
                        name="글쓰기"
                        component={Write}
                      />
               </Stack.Navigator>   
            )}
          </Tab.Screen>
        <Tab.Screen name="Search" component={Search} options={{tabBarIcon: () => (<Icon name='search' size={23}></Icon>)}}/>


        <Tab.Screen name="MyPage" options={{tabBarIcon: () => (<Icon name='user' size={23}/>)}}>
        {()=>(
               <Stack.Navigator >
                    <Stack.Screen 
                        name="로그인"
                        component={MyPageMain}
                      />
               </Stack.Navigator>   
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App