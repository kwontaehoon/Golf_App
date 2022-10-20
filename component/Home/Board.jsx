import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Scrollview } from 'react-native'
import { getFirestore, collection, getDocs, docSnap, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'
import moment from "moment"
import AsyncStorage from '@react-native-async-storage/async-storage';

const a = StyleSheet.create({
    container:{

    },
    header:{
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 5,
    },
    write:{
        padding: 10,
    },
    box:{
        height: '82.5%',
        borderWidth: 1,
        borderColor: 'black',
    },
    subbox:{
        borderWidth: 1,
        borderColor: 'black',
        height: 70,
        padding: 15,
        justifyContent: 'center',
    },
    box2:{
        borderWidth: 1,
        borderColor: 'black',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        borderWidth: 1,
        borderColor: 'black',
        width: 30,
        height: 30,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const Board = ({navigation, route}) => {

    console.log('route: ', route.params);
    console.log(AsyncStorage.getItem('user'));
    

    const app = firebaseConfig;
    const db = getFirestore(app);

    const [info, setInfo] = useState([]); // 게시판 데이터
    console.log('Board info: ', info);

    useEffect(()=>{
        board_insert();
    }, [route]);

    const board_insert = async() => {
        const user = await AsyncStorage.getItem('user');

        if(route.params !== undefined){
            console.log(route.params[0]);
            console.log(route.params[1]);
        await setDoc(doc(db, "board", String(info.length+1)), {
            id: "plumber",
            title: route.params[0],
            content: route.params[1],
            date: moment().format("YYYY.MM.DD HH:mm"),
            writer: user,
        });
    }

        let arr = [];
        const querySnapshot = await getDocs(collection(db, "board"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
        });
        console.log('arr: ', arr);
        console.log('board 총길이: ', arr.length); 
        setInfo(arr);
    }

    const write = async() => {

        const value = await AsyncStorage.getItem('user');
        if(value === null){
            alert('로그인 후 이용해주세요.');
        }else navigation.navigate('글쓰기');
        
    }
   
    const List1 = () => {
        let arr = [];
        info.reverse().map((x, index) =>{
            arr.push(
            <View style={a.subbox} key={index}>
                <Text>{x.title}</Text>
                <View>
                    <Text style={{marginRight: 20}}>{x.writer}</Text>
                    <Text>{x.date} | 조회수</Text>
                </View>
            </View>
            )
            })
        return arr;
    }

    
  return (
    <View style={a.container}>
        <View style={a.header}>
            <TouchableOpacity style={a.write} onPress={write}>
                <Text style={{fontWeight: 'bold'}}>글 쓰기</Text>
            </TouchableOpacity>
        </View>
        <View style={a.box}>
            <List1/>
        </View>
        <View style={a.box2}>
            <TouchableOpacity style={a.button}>
                <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={a.button}>
                <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={a.button}>
                <Text>3</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Board