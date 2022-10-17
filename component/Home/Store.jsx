import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';


const Store = () => {

  const a = StyleSheet.create({
    container:{
      
    },
    filter:{
      width: '100%',
      height: 100,
      position: 'absolute',
      zIndex: 100,
      bottom: 50,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button:{
      width: 150,
      height: 50,
      backgroundColor: 'green',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    main:{
      borderWidth: 2,
      borderColor: 'black',
      height: '90%',
      backgroundColor: 'pink',
    },
    box:{
      backgroundColor: 'green',
      height: 150,
    }
  })

  const number = useSelector(state=>state.info);
  const [selectedItem, setSelectedItem] = useState(null); // 매장 선택시
  console.log('selectItem: ', selectedItem)
  const [info, setInfo] = useState([]);
  console.log('info: ', info);

  useEffect(()=>{
    let arr = [];
    number.filter((x, index)=>{
      arr.push({id: index+1, title: x.course_name, address: x.address01, tel: x.tel});
    })
    setInfo(arr);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={a.container}>
      <View style={a.filter}>
        <TouchableOpacity style={a.button}><Text>매장으로 검색하기</Text></TouchableOpacity>
        <TouchableOpacity style={a.button}><Text>지역으로 검색하기</Text></TouchableOpacity>
        
      </View>
      <AutocompleteDropdown clearOnFocus={false} closeOnBlur={false}
      closeOnSubmit={false} initialValue={{ id: 1 }} // or just '2'
      onSelectItem={setSelectedItem}
      dataSet={info} />

      <View style={a.main}>
        <FlatList data={info} renderItem={renderItem}>
          <View style={a.box}>
          
          </View>
        </FlatList>
      </View>
    </View>
  )
}

export default Store