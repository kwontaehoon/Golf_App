import React, {useState, useEffect ,useRef } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import firebaseConfig from '../../firebase'

const a = StyleSheet.create({
    container:{
        width: 400,
        height: 650,
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

const Reservation2 = ({scroll, setScroll, reservation2}) => {

    const animation = useRef(new Animated.Value(0)).current;
    const [count, setCount] = useState(1); // 인원 수
    const [gender, setGender] = useState([false, false]); // 성별 버튼

    console.log(reservation2);

    const app = firebaseConfig;
    const db = getFirestore(app); /////////////////////////////////////////////////////////////////
    const washingtonRef = doc(db, "reservation", String(reservation2.id));

    useEffect(() => {
        Animated.timing(animation, {
          toValue: scroll ? 0 : -1000,
          useNativeDriver: true, // 애니메이션 처리작업을 자바스크립트 엔진이 아닌
          // 네이티브 레벨에서 진행하게 하는 옵션
        }).start();
      }, [scroll]);

    const count_people = (e) => {
        if(e === 'up' && count < reservation2.sumpeople - reservation2.currentpeople){
            setCount(count + 1);
        }else if(e === 'down' && count > 1){
            setCount(count - 1);
        }
    }
    const gender_people = (e) => {
        let arr = [];
        if(e === '남'){
            arr = [true, false];
        }else arr = [false, true];
        console.log('arr: ', arr);
        setGender(arr);
    }

    const update = async() => {
        await updateDoc(washingtonRef, {
            currentpeople: reservation2.currentpeople + count
          });
        alert('업데이트 완료');
        setScroll(!scroll);
    }

  return reservation2.length !== 0 ? (
    <Animated.View style={[a.container, {display: scroll ? 'flex' : 'none'}]}>
        <View style={a.header}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>조인 등록</Text>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>골프장</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15}}>{reservation2.title}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>위치</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15}}>{reservation2.location}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>날짜</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15}}>{reservation2.dday}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>시간</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15}}>{reservation2.dtime}</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>생년월일</Text>
            </View>
                <View style={a.content}>
                <Text style={{fontSize: 15}}>1997.07.25</Text>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>성별</Text>
            </View>
            <View style={[a.content, {flexDirection: 'row', height: 40, borderRadius: 20, alignItems: 'center', borderWidth: 1}]}>
                <TouchableOpacity style={[a.people, {borderRightWidth: 1, backgroundColor: gender[0] ? 'skyblue' : 'white'}]} onPress={()=>gender_people('남')}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>남</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[a.people, {backgroundColor: gender[1] ? 'pink' : 'white'}]} onPress={()=>gender_people('여')}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>여</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={a.box1}>
            <View style={a.title}>
                <Icon name='check' style={{paddingRight: 10, color: 'orange'}} />
                <Text style={{fontSize: 18}}>인원</Text>
            </View>
                <View style={[a.content, {flexDirection: 'row'}]}>
                    <TouchableOpacity onPress={()=>count_people('up')}><Icon name="toggle-up" style={{fontSize: 20, marginRight: 4}}></Icon></TouchableOpacity>
                    <Text style={{fontSize: 17}}>{count}명</Text>
                    <TouchableOpacity onPress={()=>count_people('down')}><Icon name="toggle-down" style={{fontSize: 20, marginLeft: 4}}></Icon></TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'green'}]} onPress={update}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[a.submit, {backgroundColor: 'red'}]} onPress={()=>setScroll(!scroll)}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>취소하기</Text>
        </TouchableOpacity>
    </Animated.View>
  ) : ( <View></View>)
}

export default Reservation2