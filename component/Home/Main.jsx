import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

const a = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30,
    },
    header:{
        borderWidth: 1,
        borderColor: 'black',
        height: '15%',
        flexDirection: 'row',
        padding: 20,
    },
    head1:{
        flex: 2,
        justifyContent: 'center',
    },
    head2:{
        flex: 1,
        alignItems: 'flex-end'
    },
    box1:{
        borderWidth: 1,
        borderColor: 'black',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2:{
        height: 200,
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
        height: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ivory'
    }
})
const Main = ({navigation}) => {
  return (
    <View style={a.container}>
        <View style={a.header}>
            <View style={a.head1}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그인을 해주세요.</Text>
            </View>
            <View style={a.head2}>
                <Text>알림</Text>
            </View>
        </View>
        <View style={a.box1}>
            <Text>최신 부킹 정보</Text>
        </View>

        <View style={a.box2}>
            <TouchableOpacity style={a.subbox2} onPress={()=>navigation.navigate('예약')}>
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