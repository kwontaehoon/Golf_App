import React, {useState, useEffect ,useRef } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Touchable } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import CalendarView from './CalendarView'
import firebaseConfig from '../../firebase'
import { getFirestore, collection, getDocs, docSnap, setDoc, doc, getDoc } from 'firebase/firestore'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

const a = StyleSheet.create({
    container:{
        width: 400,
        height: 700,
        position: 'absolute',
        backgroundColor: 'white',
        top: '-20%',
        left: 5,
        zIndex: 100,
        padding: 10,
        borderRadius: 15,
    },
    header:{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box1:{
        height: 50,
        marginTop: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    people:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        height: 40,
    },
    submit:{
        borderWidth: 1, 
        borderColor: 'black',
        marginTop: 20,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
})

const Reservation_add = ({scroll2, setScroll2}) => {

    const app = firebaseConfig;
    const db = getFirestore(app); /////////////////////////////////////////////////////////////////
    const number = useSelector(state=>state.info);
    console.log(number);

    const animation = useRef(new Animated.Value(0)).current;

    const [count, setCount] = useState(1); // 인원 수
    const [scroll, setScroll] = useState(false); // 달력 display
    const [selectDate, setSelectdate] = useState(''); // 날짜 선택 결과값
    const [selectTime, setSelectTime] = useState(); // 시간 선택 결과값
    console.log(selectTime);
    console.log(selectTime === undefined);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState();
    const [memo, setMemo] = useState('');
    const [reservationlength, setReservationlength] = useState(); // 만든 방 전체 갯수
    const [show, setShow] = useState(false); // 날짜 선택시 display
    const [info, setInfo] = useState([]); // 전체 골프장

    useEffect(() => {
        Animated.timing(animation, {
          toValue: scroll2 ? 0 : -1000,
          useNativeDriver: true, // 애니메이션 처리작업을 자바스크립트 엔진이 아닌
          // 네이티브 레벨에서 진행하게 하는 옵션
        }).start();
        let arr = [];
        number.filter((x, index)=>{
            arr.push({id: index+1, title: x.course_name});
          })
          setInfo(arr);
      }, [scroll2]);
    
    useEffect(()=>{
        test();
    });

    const test = async() => {
        const querySnapshot = await getDocs(collection(db, "reservation"));
        let count = '';
        querySnapshot.forEach((doc, index) => {
            // doc.data() is never undefined for query doc snapshots
            count = doc.id;
        });
        setReservationlength(count);
    }


    const count_people = (e) => {
        if(e === 'up' && count < 100){
            setCount(count + 1);
        }else if(e === 'down' && count > 1){
            setCount(count - 1);
        }
    }

    const storage_add = async() => {
        const value = await AsyncStorage.getItem('user');
        console.log('value: ', value);
        switch(true){
            case title.length === 0: alert('골프장을 입력해주세요.'); return;
            case selectDate.length === 0: alert('날짜를 선택해주세요.'); return;
            case selectTime === undefined: alert('시간을 선택해주세요.'); return;
            case price === undefined: alert('가격을 입력해주세요.'); return;
            default: alert('방만들기 완료!!'); break;
        }
        await setDoc(doc(db, "reservation", String(Number(reservationlength)+1)), {
          id: String(Number(reservationlength)+1),
          master: value,
          sumpeople: count,
          currentpeople: 1,
          dday: selectDate,
          dtime: selectTime,
          location: location,
          price: price,
          title: title,
          memo: memo,
      });
      setScroll2(!scroll2);
    }

    const select = (e) => {
        if(e !== null){
            setTitle(e.title);
            setLocation(e.location);
        }
    }
    const select2 = (e) => {
        const date = new Date(e.nativeEvent.timestamp);
        console.log(date);
        setShow(!show);
        setSelectTime(`${date.getHours()}시 ${date.getMinutes()}분`);
    }


  return (
    <Animated.View style={[a.container, {display: scroll2 ? 'flex' : 'none'}]}>
        <CalendarView scroll={scroll} setScroll={setScroll} selectDate={selectDate} setSelectdate={setSelectdate} />
        <View style={a.header}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>방 만들기</Text>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>골프장</Text>
            </View>
                <AutocompleteDropdown clearOnFocus={false} closeOnBlur={false}
      closeOnSubmit={false} initialValue={{ id: 1 }} // or just '2'
      dataSet={[
        { title: 'Alpha', location: '서울' },
        { title: 'Beta', location: '인천' },
        { title: 'Gamma', location: '김포' },
        { title: 'Gamma', location: '김포' },
        { title: 'Gamma', location: '김포' },
        { title: 'Gamma', location: '김포' },
        { title: 'Gamma', location: '김포' },
        { title: 'Gamma', location: '김포' },
      ]}
      inputContainerStyle={{width: 200, backgroundColor: 'pink'}}
      onSelectItem={(e)=>select(e)}
      containerStyle={{backgroundColor: 'black'}}
      position={'absolute'}
      />

        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>위치</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15, paddingRight: 20}}>{location}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>날짜</Text>
            </View>
            <View style={[a.content, {flexDirection: 'row'}]}>
                <View style={{ padding: 6, borderRadius: 10, marginRight: 5}}>
                    <Text>{selectDate}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'skyblue', padding: 6, borderRadius: 10}}
                    onPress={()=>setScroll(!scroll)}>
                <Text style={{fontWeight: 'bold'}}>날짜선택</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>시간</Text>
            </View>
            <View style={[a.content, {flexDirection: 'row'}]}>
                <View style={{ padding: 6, borderRadius: 10, marginRight: 5}}>
                    <Text>{selectTime}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'skyblue', padding: 6, borderRadius: 10}}
                onPress={()=>setShow(!show)}>
                <Text style={{fontWeight: 'bold'}}>시간선택</Text>
                </TouchableOpacity>
                {show && (<DateTimePicker mode="time" value={new Date()} onChange={(e)=>select2(e)} /> )}
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>가격</Text>
            </View>
                <View style={a.content}>
                <TextInput placeholder='금액을 입력해주세요' onChangeText={setPrice}></TextInput>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>최대인원</Text>
            </View>
                <View style={[a.content, {flexDirection: 'row'}]}>
                    <TouchableOpacity onPress={()=>count_people('up')}><Icon name="toggle-up" style={{fontSize: 20, marginRight: 4}}></Icon></TouchableOpacity>
                    <Text style={{fontSize: 17}}>{count}명</Text>
                    <TouchableOpacity onPress={()=>count_people('down')}><Icon name="toggle-down" style={{fontSize: 20, marginLeft: 4}}></Icon></TouchableOpacity>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>메모</Text>
            </View>
                <View style={a.content}>
                <TextInput placeholder='남길말을 입력해주세요' onChangeText={(e)=>{setMemo(e)}}></TextInput>
            </View>
        </View>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'green'}]} onPress={storage_add}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'red'}]} onPress={()=>setScroll2(!scroll2)}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>취소하기</Text>
        </TouchableOpacity>
    </Animated.View>
  )
}

export default Reservation_add