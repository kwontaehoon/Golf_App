import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const a = StyleSheet.create({
    container:{
    },
    item: {
        width: 200,
        marginRight: 10,
      },
    title: {
        fontSize: 32,
    },
    header:{
        backgroundColor: 'pink',
        borderColor: 'black',
        height: '42%',
    },
    image2:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    box1:{
        width: '80%',
        height: 65,
        backgroundColor: 'white',
        opacity: 0.7,
        marginTop: 60,
        borderRadius: 20,
        flexDirection: 'row',
    },
    location:{
        width: '50%',
        height: 30,
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box2:{
        height: 190,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
    },
    subbox2:{
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        elevation: 5,
    },
    image:{
        width: '50%',
        height: '60%',
        marginBottom: 20,
      },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
      },
    box4:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ivory'
    }
})
const Main = ({navigation}) => {

  return (
    <View style={a.container}>
        <View style={a.header}>
            <ImageBackground source={require('../../assets/images/course02.jpg')} resizeMode='stretch' style={a.image2}>
                <View style={a.box1}>
                    <View style={{flex: 1, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/images/sun.png')} style={{width: '65%', height: '80%'}} resizeMode='stretch'></Image>
                        <Text style={{fontSize: 18, marginLeft: 5, fontWeight: 'bold'}}>18º</Text>
                    </View>
                    <View style={{flex: 2,}}></View>
                    <View style={{flex: 1, padding: 5, justifyContent: 'center'}}><Text style={{fontSize: 12}}>남서풍 1m/s</Text></View>
                </View>
                <View style={a.location}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                        <Icon name='location-outline' size={18}></Icon>경기도 김포시 유현로 200</Text>
                </View>
            </ImageBackground>
        </View>

        <View style={a.box2}>
            <TouchableOpacity style={a.subbox2} onPress={()=>navigation.navigate('실시간 예약')}>
                <Image source={require('../../assets/images/check.png')} style={a.image} resizeMode='stretch'></Image>
                <Text style={a.text}>실시간 예약</Text>
            </TouchableOpacity>
            <TouchableOpacity style={a.subbox2} onPress={()=>navigation.navigate('게시판')}>
                <Image source={require('../../assets/images/board.png')} style={a.image} resizeMode='stretch'></Image>
                <Text style={a.text}>게시판</Text>
            </TouchableOpacity>
        </View>

        <View style={a.box2}>
            <TouchableOpacity style={a.subbox2} onPress={()=>navigation.navigate('검색')}>
                <Image source={require('../../assets/images/store.png')} style={a.image} resizeMode='stretch'></Image>
                <Text style={a.text}>매장 검색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={a.subbox2} onPress={()=>navigation.navigate('앨범')}>
                <Image source={require('../../assets/images/photo.png')} style={a.image} resizeMode='stretch'></Image>
                <Text style={a.text}>앨범</Text>
            </TouchableOpacity>
        </View>

        <View style={a.box4}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>쉽고 빠른 골프장 부킹, K-Golf</Text>
        </View>
    </View>
  )
}

export default Main