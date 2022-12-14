import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Switch, Button } from 'react-native'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, getRedirectResult, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import authentication from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginOk from './LoginOk';

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
    auto:{
        width: '80%',
        flexDirection: 'row',
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
        marginBottom: 20,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const Main = ({navigation}) => {

 
    const [userinfo, SetUserinfo] = useState(null);
    console.log('userinfo: ', userinfo);
    const [email, setEmail] = useState();
    console.log('email: ', email);
    const [password, setPassword] = useState();
    console.log('password: ', password);

    const [isEnabled, setIsEnabled] = useState(false); // 자동로그인 스위치
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const auth = getAuth(authentication);
    const provider = new GoogleAuthProvider();
    const provider2 = new FacebookAuthProvider();

    useEffect(()=>{
       user();
    }, []);

    const user = async() => {
        const value = await AsyncStorage.getItem('user');
        if(value !== null){
            SetUserinfo(value);
        }
    }

    const login = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        AsyncStorage.setItem('user', email);
        navigation.navigate('마이페이지');
        })
        .catch((error) => {
            console.log('error');
            alert('아이디와 비밀번호를 확인해주세요.');
            console.log();
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    const google_login = () => {
        console.log('google_login');
        getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const facebook_login = async() => {
        await signInWithPopup(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        AsyncStorage.setItem('user', email);
        navigation.navigate('마이페이지');
        })
        .catch((error) => {
            console.log('error');
            alert('아이디와 비밀번호를 확인해주세요.');
            console.log();
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

  return userinfo === null ? (
    <View style={a.container}>
    <View style={a.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>로그인</Text>
    </View>
    <View style={a.main}>
        <SafeAreaView>
            <TextInput style={a.input} placeholder='이메일' onChangeText={setEmail}/>
            <TextInput style={a.input} secureTextEntry={true} placeholder='비밀번호' onChangeText={setPassword}/>
        </SafeAreaView>
    <View style={a.auto}>
       <Text>자동 로그인</Text>
       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch} value={isEnabled} />
    </View>
    <TouchableOpacity style={[a.bar, {backgroundColor: '#ddd'}]} onPress={login}>
        <Text style={a.text}>로그인</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[a.bar, {backgroundColor: 'white'}]} onPress={google_login}>
        <Text style={a.text}>google 로그인</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[a.bar, {backgroundColor: 'darkblue'}]} onPress={facebook_login}>
        <Text style={[a.text, {color: 'white'}]}>FaceBook 로그인</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={a.bar} onPress={()=>navigation.push('회원가입')}>
        <Text style={a.text}>회원가입</Text>
    </TouchableOpacity>

    </View>
</View>
  ) : (<LoginOk />)
}

export default Main