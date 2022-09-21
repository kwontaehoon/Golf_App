import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const a = StyleSheet.create({
    container:{

    },
    header:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    box:{
        borderBottomWidth: 1,
        borderColor: 'grey',
        height: 50,
        paddingLeft: 20,
    },
    box2:{
        height: '80%',
        paddingLeft: 20,
        paddingTop: 20,
    },
    write:{
        marginRight: 10,
        padding: 10,
    },
})
const Write = ({navigation}) => {

    const [title, setTitle] = useState([]); // 글작성 제목
    console.log('title: ', title);
    const [content, setContent] = useState([]); // 글작성 내용
    console.log('content: ', content);

    const save = () => {
        
    }

    const register = () => {
        switch(true){
            case title.length === 0 : alert('제목을 입력해주세요.'); return;
            case content.length === 0 : alert('내용을 입력해주세요.'); return;
        }
        alert('등록완료!!');
        navigation.navigate('게시판', [title, content]);
    }
  return (
    <View style={a.container}>
        <View style={a.header}>
            <TouchableOpacity style={a.write} onPress={save}>
                <Text style={{fontWeight: 'bold'}}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={a.write} onPress={register}>
                <Text style={{fontWeight: 'bold'}}>등록</Text>
            </TouchableOpacity>
        </View>
        <TextInput style={a.box} placeholder='제목' onChangeText={(e)=>setTitle(e)}>

        </TextInput>
        <TextInput style={a.box2} textAlignVertical='top' onChangeText={(e)=>setContent(e)} placeholder='내용을 입력하세요.'>
            
        </TextInput>
    </View>
  )
}

export default Write