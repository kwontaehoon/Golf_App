import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, getDocs, docSnap, setDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'


const a = StyleSheet.create({
  container:{
    marginTop: 40,
  },
  image:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  container2:{
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 30,
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
  content:{
    fontWeight: 'bold',
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
    marginTop: 20,
    padding: 10,
  },
  minibox:{
    borderWidth: 1,
    width: 45,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9EA85',
  }
})

const LoginOk = ({navigation}) => {

  const app = firebaseConfig;
  const db = getFirestore(app);

  useEffect(()=>{
    AsyncStorage.getItem('user', (err, result) => { //user_id에 담긴 아이디 불러오기
      setEmail(result);
    });
  }, []);

  useEffect(()=>{
    reservation();
}, []);

const reservation = async() => {
    const user = await AsyncStorage.getItem('user');
    console.log('user: ', user);

    let arr = [];
    const querySnapshot = await getDocs(collection(db, "reservation"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if(doc.data().master === user){
      arr.push(doc.data());
    }
    });
    setInfo(arr);
}


  const [info, setInfo] = useState([]); // 본인 예약 정보
  console.log('info: ', info);
  console.log(info.length);
  
  const renderItem = ({ item }) => (
    <View style={a.box}>
      <View style={a.minibox}><Text>모집중</Text></View>
      <Text style={{fontWeight: 'bold', marginTop: 2}}>{item.title} | {item.location}</Text>
      <Text style={{marginTop: 2}}>{item.dday} {item.dtime}</Text>
      <Text>{item.currentpeople} / {item.sumpeople}</Text>
      <Text>{item.memo}</Text>
    </View>
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
    navigation.navigate('로그인');
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
            <TouchableOpacity style={a.option} onPress={logout}><Text style={a.content}><Icon2 name='logout' size={18} style={{paddingTop: 4}}></Icon2> 로그아웃</Text></TouchableOpacity>
          </View>
        </View>
        <View style={a.subcontainer2}>
          <View style={a.header}><Text style={{fontSize: 20}}>나의 예약</Text></View>
          {info.length !== 0 ? (<FlatList
            data={info}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}/>) : (<View style={a.container2}>
              <TouchableOpacity><Icon name='plus-circle' size={40} style={{color: 'lightgrey'}}></Icon></TouchableOpacity>
              <Text style={{marginTop: 10}}>예약이 없습니다.</Text>
              </View>)}
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