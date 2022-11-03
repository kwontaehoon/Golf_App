import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeFirestore } from "firebase/firestore";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment"

const a = StyleSheet.create({
  container:{

  },
  main:{
    height: '88.5%',
  },
  box:{
    padding: 5,
    height: 80,
    marginBottom: 5,
    flexDirection: 'row',
  },
  box2:{
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  box3:{
    padding: 5,
    height: 80,
    marginBottom: 5,
    flexDirection: 'row',
    marginTop: -60,
  },
  profilebox:{
    backgroundColor: 'white',
    width: '18%',
    borderRadius: 35,
  },
  subbox:{
    width: '70%',
    justifyContent: 'center',
    marginLeft: 10,
  },
  subbox2:{
    alignItems: 'flex-end',
    width: '80%',
    justifyContent: 'center',
  },
  subbox3:{
    width: '70%',
    marginLeft: '20.5%',
    justifyContent: 'center',
  },
  namebox:{
    width: 130,
    height: '30%',
  },
  messagebox:{
    height: '30%',
    flexDirection: 'row',
  },
  message:{
    width: '90%',
    paddingLeft: 5,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
  },
  date:{
    width: '10%',
    justifyContent: 'flex-end',
  },
  messagebox2:{
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 10,
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

  let taehoon = 0;

  useEffect(()=>{
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setInfo(data);
    });

    AsyncStorage.getItem('user', (err, result) => { //user_id에 담긴 아이디 불러오기
      setUser(result);
    });
  }, [])
  
  const [info, setInfo] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState();

  const write = () => {
    console.log('실시간 데이터베이스 쓰기');
    const db = getDatabase();
    let count = 0;
    if(info === null){
      count === 0
    }else count = info.length;
    set(ref(db, '/' + count), {
      username: user,
      message: text,
      clock: moment().format("HH:mm"),
      
    });
    setText('');
  }

  const renderItem = ({ item }) => {
    if(item.username === user){
      return(
      <View style={a.box2}>
        <View style={a.subbox2}>
            <View style={a.messagebox2}>
              <Text>{item.message}</Text>
            </View>
        </View>
      </View>
      )
    }else{
      if(taehoon !== item.clock){
        taehoon = item.clock;
        return (
    <View style={a.box}>
        <View style={a.profilebox}></View>
        <View style={a.subbox}>
          <View style={a.namebox}>
            <Text>{item.username}</Text>
          </View>
          <View style={a.messagebox}>
            <View style={a.message}>
              <Text>{item.message}</Text>
            </View>
            <View style={a.date}>
              <Text style={{fontSize: 9}}>{item.clock}</Text>
            </View>
          </View>
        </View>
    </View>
  )
      }else{
        if(taehoon === item.clock){
        return (
          <View style={a.box3}>
        <View style={a.subbox3}>
        <View style={a.namebox}></View>
          <View style={a.messagebox}>
            <View style={a.message}>
              <Text>{item.message}</Text>
            </View>
            <View style={a.date}>
              <Text style={{fontSize: 9}}>{item.clock}</Text>
            </View>
          </View>
        </View>
    </View>
        )
        }
      }
}}; 

  return (
    <View style={a.container}>
      <View style={a.main}>
        <FlatList data={info} renderItem={renderItem} />
      </View>
        <View style={a.footer}>
          <View style={a.plus}><Text style={{fontSize: 30}}>+</Text></View>
          <TextInput style={a.text} value={text} onChangeText={(e)=>setText(e)}
          />
          <TouchableOpacity style={a.send} onPress={write}><Icon name='send' size={18}></Icon></TouchableOpacity>
        </View>
    </View>
  )
}

export default Search_Page