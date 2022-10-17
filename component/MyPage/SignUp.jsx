import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const a = StyleSheet.create({
  
  container:{
  },
  header:{
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    height: 400,
    alignItems: 'center',
  },
  input: {
    width: 320,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  overlap:{
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#ddd',
    width: 60,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar:{
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
  }
})

const SignUp = ({navigation, route}) => {

  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userAddress2, setUserAddress2] = useState('');
  const [overlap, setOverlap] = useState([false, false]); // 중복확인

  const auth = getAuth();

  const address = () => {
    if(route.params === undefined){return '우편번호'}
    else return route.params;
  }

  const overlap_check = () => {
    console.log('중복확인중');
  }

  const overlap_text = () => {
    if(userEmail.length === 0 || overlap[0] === false){
    return(<Text style={{color: 'red'}}>아이디를 다시 입력해주세요.</Text>)
    }else return(<Text style={{color: 'green'}}>사용할 수 있는 아이디입니다.</Text>)
  }

  const submit = () => { // 계정 생성하기 눌렀을 때

    switch(true){
      // case overlap[1] !== true : alert('중복확인을 해주세요.'); break;
      case userName.length === 0 : alert('이름을 입력해주세요.'); break;
      case userPass.length === 0 : alert('비밀번호를 입력해주세요.'); break;
      case userEmail.length === 0 : alert('이메일을 입력해주세요.'); break;
      // case userAddress.length === 0 : alert('주소를 입력해주세요.'); break;
      case userAddress2.length === 0 : alert('상세주소를 입력해주세요.'); break;
      default :
      console.log('ddd');
      createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
          // Signed in
          console.log('회원가입 완료');
          navigation.push('로그인');
          const user = userCredential.user;
      })
      .catch((error) => {
          const errorCode = error.code;
          console.log('errorCode: ', errorCode);
          const errorMessage = error.message;
          console.log('errorMessage: ', errorMessage);
      });
      break;
    }
}

  return (
    <View style={a.container}>
      <View style={a.header}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>회원가입</Text>
      </View>
      <View style={a.main}>
          <SafeAreaView>
              <TextInput style={a.input} placeholder='이름' onChangeText={setUserName}/>
              <View>
                <TextInput style={[a.input, {width: '60%'}]} placeholder='이메일' onChangeText={setUserEmail}/>
                <TouchableOpacity style={a.overlap} onPress={overlap_check}><Text>중복확인</Text></TouchableOpacity>
              </View>
              <View style={{marginLeft: 15, display: overlap[1] ? 'flex' : 'none'}}>{overlap_text()}</View>
              <TextInput style={a.input} placeholder='비밀번호' onChangeText={setUserPass}/>
              <TextInput style={a.input} placeholder='비밀번호 확인'/>
              <View>
                <View style={[a.input, {width: '60%'}]}>
                  <Text style={{color: 'black'}}>{address()}</Text>
                </View>
                <TouchableOpacity style={a.overlap} onPress={()=>navigation.push('Post')}><Text>검색</Text></TouchableOpacity>
              </View>
              <TextInput style={a.input} placeholder='상세주소' onChangeText={setUserAddress2}/>
          </SafeAreaView>
          <TouchableOpacity style={[a.bar, {backgroundColor: '#ddd'}]} onPress={submit}>
            <Text style={a.text}>계정 생성하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp