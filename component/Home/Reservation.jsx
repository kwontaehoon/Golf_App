import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getDate, addDays, format } from 'date-fns'
import Reservation2 from './Reservation2'
import Reservation_add from './Reservation_add'
import * as SQLite from "expo-sqlite"
import firebaseConfig from '../../firebase'
import { getFirestore, collection, getDocs, docSnap, setDoc, doc, getDoc } from 'firebase/firestore'

const a = StyleSheet.create({
  container:{
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
    borderWidth: 1,
    borderColor: 'black',
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

  add:{
    height: 50,
    justifyContent: 'center',
  },
  addbox:{
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-around',
  },
  addbox2:{
    height: 30,
    paddingLeft: 10,
  },
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

  const menu = ["서울", "경기", "인천", "경북", "경남", "충북", "충남", "제주도"];
  const menu2 = ["20대", "30대", "40대", "50대", "무관"];
  const menu3 = ["남", "여", "무관"];

  const app = firebaseConfig;
  const db = getFirestore(app);
  const sqlitedb = SQLite.openDatabase('test.db');

  console.log('sqlite: ', sqlitedb);

  // const db = SQLite.openDatabase('test.db');
  // // const db2 = DatabaseConnection.getConnection();

  // console.log(FileSystem.documentDirectory + "SQLite/test.db");


  const [reservation_info, setReservation_info] = useState([]); // firebase 방 정보
  console.log('reservation_info: ', reservation_info);
  const [info, setInfo] = useState([]); // sqlite 정보
  console.log('info: ', info);
  const [week, setWeek] = useState([]); // 날짜
  console.log('week: ', week);
  const [date, setDate] = useState(Array.from({length: 14}, () => { return false })); // 선택 날짜
  const [scroll, setScroll] = useState(false); // 예약 상세정보 display
  const [scroll2, setScroll2] = useState(false); // 방만들기 display
  const [add_display, setAdd_display] = useState(false); // 더보기 display

  const arr = [
    {
    coursename: '레익스빌골프클럽',  //골프장 이름
    coursearea: '강원도 속초시',  //위치
    coursemoney: '200,000원',  //참가가격
    dday : '2020-12-12',   //일시 
    gender: '무관',   //성별조건
    age: '무관',       //연령조건
    average: 100,  //에버리지조건
    rec: 10,          //모집 인원
    admin: 'test',  //개설자
    rcount: 3,       //모집된 인원
    grpname: 'asd, bsb, ddd',  //참가원 별명
    grpemail: 'sdf@asdf.com, asd@ad.com,text@dd.com'  //참가원 이메일
  }
]


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
  <TouchableOpacity style={a.item2} key={item.grpemail} onPress={()=>setScroll(!scroll)}>
    <View style={a.content2}><Text>{item.location}</Text></View>
    <View style={a.content2}><Text>{item.title}</Text></View>
    <View style={a.content2}><Text>{item.dday}</Text></View>
    <View style={a.content2}>
      <Text>{item.price}</Text>
      <View style={{alignItems: 'flex-end', width: '100%', marginRight: 30, marginTop: 10,}}><Text> 3 / 5</Text></View>
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
}, []);

const date_click = (e) => {
  console.log('e: ', e);
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
  setReservation_info(arr);
}

  return (
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
          defaultButtonText={'지역 선택'}
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
          defaultButtonText={'나이 선택'}
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
          defaultButtonText={'성별 선택'}
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
        <TouchableOpacity style={a.add} onPress={()=>setAdd_display(!add_display)}>
          <Text style={{fontSize: 15, color: 'gray'}}>+ 더보기</Text>
        </TouchableOpacity>
      </View>
        <View style={[a.addbox, {display: add_display ? 'flex' : 'none'}]}>
          <View style={a.addbox2}>
            <Text>모집인원: </Text>
          </View>
          <View style={a.addbox2}>
            <Text>가격: </Text>
          </View>
        </View>
      <View style={a.subheader}>
        <View style={a.subtitle}><Text>위치</Text></View>
        <View style={a.subtitle}><Text>골프장 명</Text></View>
        <View style={a.subtitle}><Text>일시</Text></View>
        <View style={a.subtitle}><Text>가격 및 인원</Text></View>
      </View>
      <SafeAreaView style={{height: '71%'}}>
        <TouchableOpacity style={a.add2} onPress={()=>setScroll2(!scroll2)}>
          <Icon name='plus' size={18} />
        </TouchableOpacity>
        <Reservation2 scroll={scroll} setScroll={setScroll}/>
        <Reservation_add scroll2={scroll2} setScroll2={setScroll2}/>
        <FlatList data={reservation_info} renderItem={renderItem2} keyExtractor={item => item.id}></FlatList>
      </SafeAreaView>
    </View>
  )
}

export default Reservation