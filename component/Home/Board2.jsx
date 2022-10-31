import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const a = StyleSheet.create({
    container:{
        marginTop: 40,
        padding: 5,
    },
    header:{
        height: '15%',
        borderTopWidth: 2,
        padding: 5,
        paddingTop: 30,
    },
    main:{
        height: '72%',
    },
    box:{
        borderTopWidth: 2,
        borderColor: 'grey',
        padding: 8,
    },
    footer:{
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        backgroundColor: 'black',
        width: 100,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const Board2 = ({navigation, route}) => {

    const content = [{content: route.params.e.content}];
    const data = content;

    const renderItem = ({ item }) => (
        <View style={a.box}>
            <Text>{item.content}</Text>
        </View>
    ); 

  return (
    <View style={a.container}>
        <View style={a.header}>
            <Text style={{height: '50%', fontWeight: 'bold', fontSize: 18}}>{route.params.e.title}</Text>
            <Text>등록일: {route.params.e.date}</Text>
        </View>
        <View style={a.main}>
            <FlatList data={data} renderItem={renderItem}/>
        </View>
        <View style={a.footer}>
            <TouchableOpacity style={a.button} onPress={()=>navigation.goBack()}>
                <Text style={{color: 'white',}}>목록</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Board2