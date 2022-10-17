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
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    main:{
      borderWidth: 2,
      borderColor: 'black',
      height: '77%',
      marginTop: 100,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      overflow: 'hidden',
      padding: 10,
    },
    box:{
      height: 120,
      borderBottomWidth: 1,
      borderColor: 'black',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    subbox:{
      width: '33.4%',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })

  const number = useSelector(state=>state.info);
  const [selectedItem, setSelectedItem] = useState(); // 매장 선택시
  console.log('selectItem: ', selectedItem)
  const [info, setInfo] = useState([]);
  console.log('info: ', info);
  const [filter, setFilter] = useState(false); // 매장 / 지역 버튼 누르면 배경색깔 변경

  useEffect(()=>{
    let arr = [];
    number.filter((x, index)=>{
      arr.push({id: index+1, title: x.course_name, address: x.address01, tel: x.tel});
    })
    setInfo(arr);
    setSelectedItem(arr);
  }, []);

  const select = (e) => {
    let arr = [e];
    setSelectedItem(arr);
  }
  const select_text = (e) => {
    if(e.length === 0){
      setSelectedItem(info);
    }else{
      selectedItem.map((x, index)=>{
        console.log('x: ', x);
      })
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={a.box}>
      <View style={a.subbox}><Text>{item.title}</Text></View>
      <View style={a.subbox}><Text>{item.address}</Text></View>
      <View style={a.subbox}><Text>{item.tel}</Text></View>
    </TouchableOpacity>
  ); 

  return (
    <View style={a.container}>
      <View style={a.filter}>
        <TouchableOpacity style={[a.button, {backgroundColor: filter ? 'white' : 'skyblue'}]} onPress={()=>setFilter(false)}><Text style={{fontSize: 15, fontWeight: 'bold'}}>매장으로 검색하기</Text></TouchableOpacity>
        <TouchableOpacity style={[a.button, {backgroundColor: filter ? 'skyblue' : 'white'}]} onPress={()=>setFilter(true)}><Text style={{fontSize: 15, fontWeight: 'bold'}}>지역으로 검색하기</Text></TouchableOpacity>
        
      </View>
      <AutocompleteDropdown clearOnFocus={false} closeOnBlur={false}
      closeOnSubmit={false} initialValue={{ id: 1 }} // or just '2'
      onSelectItem={(e)=>select(e)}
      dataSet={selectedItem} onChangeText={(e)=>select_text(e)}
      suggestionsListMaxHeight={300}
      showClear={false}/>

      <View style={a.main}>
        <FlatList data={selectedItem} renderItem={renderItem}/>
      </View>
    </View>
  )
}

export default Store