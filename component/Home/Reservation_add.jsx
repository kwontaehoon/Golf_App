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
import SelectDropdown from 'react-native-select-dropdown'

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
    dropdown2BtnStyle: {
        width: '45%',
        height: 30,
        backgroundColor: 'white',
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
})

const Reservation_add = ({scroll2, setScroll2}) => {

    const app = firebaseConfig;
    const db = getFirestore(app); /////////////////////////////////////////////////////////////////
    const number = useSelector(state=>state.info);

    const animation = useRef(new Animated.Value(0)).current;

    const [count, setCount] = useState(1); // ?????? ???
    const [scroll, setScroll] = useState(false); // ?????? display
    const [selectDate, setSelectdate] = useState(''); // ?????? ?????? ?????????
    const [selectTime, setSelectTime] = useState(); // ?????? ?????? ?????????
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState();
    const [memo, setMemo] = useState('');
    const [reservationlength, setReservationlength] = useState(); // ?????? ??? ?????? ??????
    const [show, setShow] = useState(false); // ?????? ????????? display
    const [info, setInfo] = useState([]); // ?????? ?????????


    useEffect(() => {
        Animated.timing(animation, {
          toValue: scroll2 ? 0 : -1000,
          useNativeDriver: true, // ??????????????? ??????????????? ?????????????????? ????????? ??????
          // ???????????? ???????????? ???????????? ?????? ??????
        }).start();
        let arr = [];
        let arr2 = [];
        number.filter((x, index)=>{
            arr.push(x.course_name);
            arr2.push(x.address01);
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
            case title.length === 0: alert('???????????? ??????????????????.'); return;
            case selectDate.length === 0: alert('????????? ??????????????????.'); return;
            case selectTime === undefined: alert('????????? ??????????????????.'); return;
            case price === undefined: alert('????????? ??????????????????.'); return;
            default: alert('???????????? ??????!!'); break;
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

    const select = (e, index) => {
        console.log(e);
        const arr = number[index].address01;
        setTitle(e);
        setLocation(arr);
    }
    const select2 = (e) => {
        const date = new Date(e.nativeEvent.timestamp);
        console.log(date);
        setShow(!show);
        setSelectTime(`${date.getHours()}??? ${date.getMinutes()}???`);
    }

  return (
    <Animated.View style={[a.container, {display: scroll2 ? 'flex' : 'none'}]}>
        <CalendarView scroll={scroll} setScroll={setScroll} selectDate={selectDate} setSelectdate={setSelectdate} />
        <View style={a.header}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>??? ?????????</Text>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>?????????</Text>
            </View>
            <SelectDropdown
          data={info}
          // defaultValueByIndex={1}
          // defaultValue={'England'}
          onSelect={(e, i)=>select(e, i)}
          defaultButtonText={'????????? ??????'}
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
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>??????</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15, paddingRight: 20}}>{location}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>??????</Text>
            </View>
            <View style={[a.content, {flexDirection: 'row'}]}>
                <View style={{ padding: 6, borderRadius: 10, marginRight: 5}}>
                    <Text>{selectDate}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 6, borderRadius: 4, borderWidth: 1, }}
                onPress={()=>setScroll(!scroll)}>
                <Text style={{fontWeight: 'bold'}}>????????????</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>??????</Text>
            </View>
            <View style={[a.content, {flexDirection: 'row'}]}>
                <View style={{ padding: 6, borderRadius: 10, marginRight: 5}}>
                    <Text>{selectTime}</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 6, borderRadius: 4, borderWidth: 1, }}
                onPress={()=>setShow(!show)}>
                <Text style={{fontWeight: 'bold'}}>????????????</Text>
                </TouchableOpacity>
                {show && (<DateTimePicker mode="time" value={new Date()} onChange={(e)=>select2(e)} /> )}
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>??????</Text>
            </View>
                <View style={a.content}>
                <TextInput placeholder='????????? ??????????????????' onChangeText={setPrice}></TextInput>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>????????????</Text>
            </View>
                <View style={[a.content, {flexDirection: 'row'}]}>
                    <TouchableOpacity onPress={()=>count_people('up')}><Icon name="toggle-up" style={{fontSize: 20, marginRight: 4}}></Icon></TouchableOpacity>
                    <Text style={{fontSize: 17}}>{count}???</Text>
                    <TouchableOpacity onPress={()=>count_people('down')}><Icon name="toggle-down" style={{fontSize: 20, marginLeft: 4}}></Icon></TouchableOpacity>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>??????</Text>
            </View>
                <View style={a.content}>
                <TextInput placeholder='???????????? ??????????????????' onChangeText={(e)=>{setMemo(e)}}></TextInput>
            </View>
        </View>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'green'}]} onPress={storage_add}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>????????????</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'red'}]} onPress={()=>setScroll2(!scroll2)}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>????????????</Text>
        </TouchableOpacity>
    </Animated.View>
  )
}

export default Reservation_add