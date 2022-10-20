import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOk = ({navigation}) => {

  const logout = async() => {
    try {
      await AsyncStorage.removeItem('user')
    } catch(error) {
      console.log('error: ', error);
    }
    console.log('Done.')
    navigation.push('로그인');
  }

  const kwon = async() => {
    try {
        const value = await AsyncStorage.getAllKeys();
        const value2 = await AsyncStorage.getItem('user');
        if(value !== null) {
          // value previously stored
        }
        console.log(value);
        console.log(value2);
      } catch(e) {
        // error reading value
      }
}

  return (
    <View>
    <TouchableOpacity onPress={logout}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
     <TouchableOpacity onPress={kwon}>
     <Text>Asyncstorage 확인</Text>
   </TouchableOpacity>
   </View>
  )
}

export default LoginOk