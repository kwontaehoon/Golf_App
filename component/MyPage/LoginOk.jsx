import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOk = () => {

  const logout = async() => {
    try {
      await AsyncStorage.removeItem('key')
    } catch(error) {
      console.log('error: ', error);
    }
  
    console.log('Done.')
  }
  return (
    <TouchableOpacity onPress={logout}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
  )
}

export default LoginOk