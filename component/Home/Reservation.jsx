import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getDate, addDays, format } from 'date-fns'
import Reservation2 from './Reservation2'
import Reservation_add from './Reservation_add'
import * as SQLite from "expo-sqlite"
import firebaseConfig from '../../firebase'
import { getFirestore, collection, getDocs, docSnap, setDoc, doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const a = StyleSheet.create({
  container:{
  },
  container2:{
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    height: '10%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  item:{
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2:{
    flex: 1,
    height: 100,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title2:{
  },
  content2:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1:{
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  dropdown2BtnStyle: {
    width: '25%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    textAlign: 'center',
    fontSize: 12,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},

  subheader:{
    height: '5%',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subtitle:{
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail:{
    width: 300,
    height: 300,
    position: 'absolute',
    backgroundColor: 'white',
    top: '10%',
    left: '15%',
    zIndex: 100,
  },
  add2:{
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  }
})

const Reservation = () => {

  const menu = ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????"];
  const menu2 = ["20???", "30???", "40???", "50???", "??????"];
  const menu3 = ["???", "???", "??????"];

  const app = firebaseConfig;
  const db = getFirestore(app);
  const sqlitedb = SQLite.openDatabase('test.db');

  console.log('sqlite: ', sqlitedb);

  // const db = SQLite.openDatabase('test.db');
  // // const db2 = DatabaseConnection.getConnection();

  // console.log(FileSystem.documentDirectory + "SQLite/test.db");


  const [reservation_info, setReservation_info] = useState([]); // firebase ??? ??????
  console.log('reservation_info: ', reservation_info);
  const [reservation2, setReservation2] = useState([]);
  const [info, setInfo] = useState([]); // sqlite ??????
  console.log('info: ', info);
  const [week, setWeek] = useState([]); // ??????
  const [date, setDate] = useState(Array.from({length: 14}, () => { return false })); // ?????? ??????
  const [scroll, setScroll] = useState(false); // ?????? ???????????? display
  const [scroll2, setScroll2] = useState(false); // ???????????? display

const weekend = (formatted, day, id) => {
  let color = '';
  switch(formatted){
    case 'Sat' : color='blue'; break;
    case 'Sun' : color= 'red'; break;
    default : color = 'black'; break;
  }
  return <View style={[{borderRadius: 30, padding: 5, marginTop: 5, backgroundColor: date[id] ? 'skyblue' : ''}]} key={id}>
          <Text style={{color: color}}>{day}</Text>
         </View>
}

const renderItem2 = ({ item }) => (
  <TouchableOpacity style={[a.item2, {backgroundColor: item.sumpeople === item.currentpeople ?  'lightgrey' : 'white'}]} key={item.grpemail} onPress={()=>select(item)}>
    <View style={a.content2}><Text>{item.location}</Text></View>
    <View style={a.content2}><Text>{item.title}</Text></View>
    <View style={a.content2}>
      <Text>{item.dday}</Text>
      <Text>{item.dtime}</Text>
    </View>
    <View style={a.content2}>
      <Text>{item.price} ???</Text>
      <View style={{alignItems: 'flex-end', width: '100%', marginRight: 30, marginTop: 10,}}><Text> {item.currentpeople} / {item.sumpeople}</Text></View>
    </View>
  </TouchableOpacity>
);

const Item = ({ formatted, day, id }) => (
  <TouchableOpacity style={a.item} key={id} onPress={()=>date_click(id)}>
    <View><Text style={{fontWeight: 'bold'}}>{formatted}</Text></View>
    {weekend(formatted, day, id)}
  </TouchableOpacity>
);

const renderItem = ({ item }) => (
    <Item formatted={item.formatted} day={item.day} id={item.id} />
);


useEffect(() => {
  sqlitedb.transaction((tx) => {
    tx.executeSql("SELECT * FROM kwon", [], (tx, results)=>{
     setInfo(results.rows._array);
      }, error => {console.log('error: ', error);});
     })
  
}, []);

useEffect(()=>{
  const date = new Date();
  let arr = [];
  for(let i=0; i<14; i++){
    let date2 = addDays(date, i);
    arr.push({
      formatted: format(date2, 'EEE'),
      day: getDate(date2),
      id: i
    });
  }
  setWeek(arr);
}, []);

useEffect(()=>{
  read();
}, [scroll2]);

const date_click = (e) => {
  let arr = Array.from({length: 14}, () => { return false });
  arr[e] = !arr[e];
  setDate(arr);
}

const read = async() => {

  const querySnapshot = await getDocs(collection(db, "reservation"));
  let arr = [];
  querySnapshot.forEach((doc) => {
      arr.push(doc.data());
  });
  setReservation_info(arr.reverse());
}

const select = (e) => {
  if(e.currentpeople !== e.sumpeople){
    setReservation2(e);
    setScroll(!scroll);
  }
}

const add = async() => {
  const value = await AsyncStorage.getItem('user');
  console.log('value: ', value);
  if(value !== null){
    setScroll2(!scroll2);
  }else alert('????????? ????????????');
}

  return reservation_info.length !== 0 ? (
    <View style={a.container}>
      <View style={a.header}>
        <FlatList data={week} renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} horizontal={true}>
        </FlatList>
      </View>
      <View style={a.box1}>
        <SelectDropdown
          data={menu}
          // defaultValueByIndex={1}
          // defaultValue={'England'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'?????? ??????'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={a.dropdown2BtnStyle}
          buttonTextStyle={a.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={15} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={a.dropdown2DropdownStyle}
          rowStyle={a.dropdown2RowStyle}
          rowTextStyle={a.dropdown2RowTxtStyle}
        />

        <SelectDropdown
          data={menu2}
          // defaultValueByIndex={1}
          // defaultValue={'England'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'?????? ??????'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={a.dropdown2BtnStyle}
          buttonTextStyle={a.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={15} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={a.dropdown2DropdownStyle}
          rowStyle={a.dropdown2RowStyle}
          rowTextStyle={a.dropdown2RowTxtStyle}
        />

      <SelectDropdown
          data={menu3}
          // defaultValueByIndex={1}
          // defaultValue={'England'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'?????? ??????'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={a.dropdown2BtnStyle}
          buttonTextStyle={a.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={15} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={a.dropdown2DropdownStyle}
          rowStyle={a.dropdown2RowStyle}
          rowTextStyle={a.dropdown2RowTxtStyle}
        />
      </View>
      <View style={a.subheader}>
        <View style={a.subtitle}><Text>??????</Text></View>
        <View style={a.subtitle}><Text>????????? ???</Text></View>
        <View style={a.subtitle}><Text>??????</Text></View>
        <View style={a.subtitle}><Text>?????? ??? ??????</Text></View>
      </View>
      <SafeAreaView style={{height: '71%'}}>
        <TouchableOpacity style={a.add2} onPress={add}>
          <Icon name='plus' size={18} />
        </TouchableOpacity>
        <Reservation2 scroll={scroll} setScroll={setScroll} reservation2={reservation2}/>
        <Reservation_add scroll2={scroll2} setScroll2={setScroll2}/>
        <FlatList data={reservation_info} renderItem={renderItem2} keyExtractor={item => item.id}></FlatList>
      </SafeAreaView>
    </View>
  ) : (
    <View style={a.container2}>
      <ActivityIndicator size="large" color='skyblue' />
    </View>
  )
}

export default Reservation