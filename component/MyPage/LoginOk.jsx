import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';


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
  profilebox:{
    borderWidth: 1,
    height: '60%',
    flexDirection: 'row',
  },
  profile:{
    width: '33.3334%',
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
    width: '67%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionbox:{
    borderWidth: 1,
    height: '40%',
    flexDirection: 'row',
  },
  option:{
    borderWidth: 1,
    width: '33.3334%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer2:{
    backgroundColor: 'white',
    width: '90%',
    height: '50%',
    marginTop: '5%',
    borderRadius: 20,
    padding: 10,
  },
  box:{
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'grey',
    height: 100,
    marginTop: 30,
  },
  content:{
    fontWeight: 'bold',

  }
})

const LoginOk = ({navigation}) => {

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  useEffect(()=>{
    AsyncStorage.getItem('user', (err, result) => { //user_id에 담긴 아이디 불러오기
      setEmail(result);
    });
  })
  
  const renderItem = ({ item }) => (
    <View style={a.box}></View>
  );

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    uploadBytes(storageRef, selectedImage.localUri).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  const [email, setEmail] = useState(''); // Asyncstorage user 이메일
  const [selectedImage, setSelectedImage] = useState(null); // select 프로필

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
            <TouchableOpacity style={a.profile} onPress={openImagePickerAsync}>
              <View style={a.circle}></View>
            </TouchableOpacity>
          <View style={a.email}>
              <View><Text>{email}</Text></View>
            </View> 
          </View>
          <View style={a.optionbox}>
            <View style={a.option}><Text style={a.content}><Icon name='diamond' size={18}></Icon> 포인트</Text></View>
            <View style={a.option}><Text style={a.content}><Icon name='gift' size={18}></Icon> 쿠폰함</Text></View>
            <View style={a.option}><Text style={a.content}><Icon name='edit' size={18}></Icon> 나의 글</Text></View>
          </View>
        </View>
        <View style={a.subcontainer2}>
          <View style={a.header}><Text style={{fontSize: 20}}>나의 예약</Text></View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} />
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