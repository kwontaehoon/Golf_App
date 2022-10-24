import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const a = StyleSheet.create({
  container:{
  },
  image:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subcontainer1:{
    backgroundColor: 'white',
    width: '90%',
    height: '30%',
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
  },
  subcontainer2:{
    backgroundColor: 'white',
    width: '90%',
    height: '50%',
    marginTop: '5%',
    borderRadius: 20,
    padding: 10,
  },
  profilebox:{
    borderWidth: 1,
    height: '60%',
    flexDirection: 'row',
  },
  profile:{
    width: '30%',
    height: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle:{
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  email:{
    width: '70%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionbox:{
    borderWidth: 1,
    height: '40%'
  }
})

const LoginOk = ({navigation}) => {

  const [email, setEmail] = useState(''); // Asyncstorage user 이메일

  useEffect(()=>{
    AsyncStorage.getItem('user', (err, result) => { //user_id에 담긴 아이디 불러오기
      setEmail(result);
    });
  })

  const logout = async() => {
    try {
      await AsyncStorage.removeItem('user')
    } catch(error) {
      console.log('error: ', error);
    }
    console.log('Done.')
    navigation.goBack();
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
    <View style={a.container}>
      <ImageBackground source={require('../../assets/images/course04.jpg')} resizeMode='stretch' style={a.image}>
        <View style={a.subcontainer1}>
          <View style={a.profilebox}>
            <View style={a.profile}>
              <View style={a.circle}></View>
          </View>
          <View style={a.email}>
              <View><Text>{email}</Text></View>
            </View> 
          </View>
          <View style={a.optionbox}>
            <View></View>
            <View></View>
            <View></View>
          </View>
        </View>
        <View style={a.subcontainer2}>

        </View>
        {/* <TouchableOpacity onPress={logout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={kwon}>
          <Text>Asyncstorage 확인</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    
   </View>
  )
}

export default LoginOk