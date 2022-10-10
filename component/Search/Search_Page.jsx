import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar} from 'react-native'
import * as SQLite from "expo-sqlite";
import * as FileSystem  from 'expo-file-system'

const a = StyleSheet.create({
  container: {
    marignTop: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
const Search_Page = () => {

  const [test, setTest] = useState([]);
  const db = SQLite.openDatabase('golf.db');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM kwon", [], (tx, results)=>{
       console.log('정보: ', results.rows._array);
        }, error => {console.log('error: ', error);});
       })
    
       for(let i =0; i<5; i++){
        console.log('i: ', i);
        console.log('test: ', test);
        setTest(i);
       }
  }, []);

  const Data = [
    {
      id: 1,
      title: 'First Item',
    },
    {
      id: 2,
      title: 'Second Item',
    },
    {
      id: 3,
      title: 'Third Item',
    },
    {
      id: 4,
      title: 'Third Item',
    },
    {
      id: 5,
      title: 'Third Item',
    },
    {
      id: 6,
      title: 'Third Item',
    },
    {
      id: 7,
      title: 'Third Item',
    },
    {
      id: 8,
      title: 'Third Item',
    },
    {
      id: 9,
      title: 'Third Item',
    },
    {
      id: 10,
      title: 'Third Item',
    },
    {
      id: 11,
      title: 'Third Item',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={a.item}>
      <Text style={a.title}>{item.title}</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={a.container}>
      <FlatList data={Data}
      renderItem={renderItem} keyExtractor={item => item.id}></FlatList>
    </SafeAreaView>
  )
}

export default Search_Page