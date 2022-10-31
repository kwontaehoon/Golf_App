import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeFirestore } from "firebase/firestore";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'
import Icon from 'react-native-vector-icons/FontAwesome'

const a = StyleSheet.create({
  container:{

  },
  main:{
    height: '88.5%',
    borderWidth: 1,
  },
  footer:{
    borderWidth: 1,
    height: 52,
    flexDirection: 'row',
  },
  plus:{
    borderWidth: 1,
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    borderWidth: 1,
    width: '72%',
    padding: 2,
  },
  send:{
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
  }
})

const Search_Page = () => {

  const app = firebaseConfig;
  const db = getFirestore(app);

  useEffect(()=>{
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    console.log(db);
    console.log(dbRef);
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log('data: ', data);
        setInfo(data);
    });
  }, [])
  
  const [info, setInfo] = useState([]);
  console.log('info: ', info);
  console.log('info 길이: ', info.length);

  const [text, setText] = useState('');
  console.log('text: ', text);

  const write = () => {
    console.log('실시간 데이터베이스 쓰기');
    const db = getDatabase();
    set(ref(db, '/' + info.length), {
      username: '태훈',
      message: text,
    });
  }

  return (
    <View style={a.container}>
      <View style={a.main}>

      </View>
        <View style={a.footer}>
          <View style={a.plus}><Text style={{fontSize: 30}}>+</Text></View>
          <TextInput style={a.text} onChangeText={(e)=>setText(e)}></TextInput>
          <TouchableOpacity style={a.send} onPress={write}><Icon name='send' size={18}></Icon></TouchableOpacity>
        </View>
    </View>
  )
}

export default Search_Page