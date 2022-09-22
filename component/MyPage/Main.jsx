import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Switch } from 'react-native'

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

const Main = () => {

 
    const [email, setEmail] = useState([]);
    const [pass, setPass] = useState([]);

    const [isEnabled, setIsEnabled] = useState(false); // 자동로그인 스위치
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View style={a.container}>
    <View style={a.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>로그인</Text>
    </View>
    <View style={a.main}>
        <SafeAreaView>
            <TextInput style={a.input} placeholder='아이디'/>
            <TextInput style={a.input} secureTextEntry={true} placeholder='비밀번호'/>
        </SafeAreaView>
    <View style={a.auto}>
       <Text>자동 로그인</Text>
       <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"} ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch} value={isEnabled} />
    </View>
    <TouchableOpacity style={[a.bar, {backgroundColor: '#ddd'}]}>
        <Text style={a.text}>로그인</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[a.bar, {backgroundColor: 'white'}]}>
        <Text style={a.text}>google 로그인</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[a.bar, {backgroundColor: 'darkblue'}]}>
        <Text style={[a.text, {color: 'white'}]}>FaceBook 로그인</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={a.bar}>
        <Text style={a.text}>회원가입</Text>
    </TouchableOpacity>
    </View>
</View>
  )
}

export default Main