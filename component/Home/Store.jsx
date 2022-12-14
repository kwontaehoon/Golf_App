import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';


const Store = () => {

  const a = StyleSheet.create({
    container:{
    },
    main:{
      alignItems: 'center',
    },
    main2:{
      width: '95%',
      height: '100%',
      backgroundColor: 'white',
      marginTop: 250,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      overflow: 'hidden',
      padding: 10,
      borderWidth: 3,
    },
    box:{
      borderBottomWidth: 1,
      borderColor: 'grey',
      height: 120,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    subbox:{
      width: '33.4%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagebox: {
      width: '100%',
      height: '40%',
      justifyContent: "center",
      position: 'absolute',
      top: 0,
    },
    image:{
      flex: 1,
    }
  })

  const number = useSelector(state=>state.info);
  const [selectedItem, setSelectedItem] = useState(); // 매장 선택시
  const [info, setInfo] = useState([]);

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
      const aa = selectedItem.filter((x, index)=>{
        if(x.title.includes(e)){
          return x;
        }
      })
      setSelectedItem(aa);
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
       <View style={a.imagebox}>
        <Image source={require('../../assets/images/course01.jpg')} resizeMode='stretch' style={a.image}></Image>
       </View>
      <AutocompleteDropdown clearOnFocus={false} closeOnBlur={false}
      closeOnSubmit={false} initialValue={{ id: 1 }} // or just '2'
      onSelectItem={(e)=>select(e)}
      dataSet={info} onChangeText={(e)=>select_text(e)}
      suggestionsListMaxHeight={300}
      showClear={false}/>

      <View style={a.main}>
        <View style={a.main2}>
          <FlatList data={selectedItem} renderItem={renderItem}/>
        </View>
      </View>
    </View>
  )
}

export default Store