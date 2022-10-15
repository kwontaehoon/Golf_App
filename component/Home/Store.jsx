import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';


const Store = () => {

  const a = StyleSheet.create({
    container:{
      
    },
    header:{
      borderWidth: 1,
      borderColor: 'black',
      height: '10%',
    },
    main:{
      borderWidth: 2,
      borderColor: 'black',
      height: 500,
    },
    box:{
      backgroundColor: 'pink',
      height: 200,
    }
  })

  const number = useSelector(state=>state.info);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log('selectItem: ', selectedItem)
  const [info, setInfo] = useState([]);

  useEffect(()=>{
    let arr = [];
    number.filter((x, index)=>{
      arr.push({id: index+1, title: x.course_name, address: x.address01, tel: x.tel});
    })
    setInfo(arr);
  }, []);

  return (
    <View style={a.container}>
      <View style={a.header}><Text>매장명으로 검색</Text></View>
      <AutocompleteDropdown clearOnFocus={false} closeOnBlur={false}
      closeOnSubmit={false} initialValue={{ id: 1 }} // or just '2'
      onSelectItem={setSelectedItem}
      dataSet={info} />

      <View style={[a.main, {display: selectedItem}]}>
        <View style={a.box}>
          <Text>{selectedItem.title}</Text>
          <Text>{selectedItem.address}</Text>
          <Text>{selectedItem.tel}</Text>
        </View>
      </View>
    </View>
  )
}

export default Store