import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

const a = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30,
    },
    item: {
        width: 200,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
      },
    title: {
        fontSize: 32,
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
        height: '20%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
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
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ivory'
    }
})
const Main = ({navigation}) => {

    const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Item",
        },
      ];

      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );

      const Item = ({ title }) => (
        <View style={a.item}>
          <Text style={a.title}>{title}</Text>
        </View>
      );
    

  return (
    <View style={a.container}>
        <View style={a.header}>
            <TouchableOpacity style={a.head1} onPress={()=>navigation('로그인')}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그인을 해주세요.</Text>
            </TouchableOpacity>
            <View style={a.head2}>
                <Icon name ='bell' size={20}></Icon>
            </View>
        </View>
        <View style={a.box1}>
            <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={(item)=>item.id}
            horizontal={true} >최신 부킹 정보</FlatList>
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