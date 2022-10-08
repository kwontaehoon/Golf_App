import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
import firebaseConfig from '../../firebase'
import Icon from 'react-native-vector-icons/FontAwesome'

// react-native reanimated
// reanimated-bottom-sheet
// react-native-image-crop-picker

const a = StyleSheet.create({
  container:{

  },
  header:{
    borderWidth: 1,
    borderColor: 'black',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    height: '65%',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'green',
  },
  header2:{
    height: '8%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  main2:{
    flexWrap: 'wrap',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: 'pink',
  },
  box:{
    width: '50%',
    height: 210,
  },
  imagebox:{
    height: '88%',
    padding: 5,
  },
  titlebox:{
    height: '15%',
    paddingLeft: 5,
  }
})

const Album = () => {

const app = firebaseConfig;
const storage = getStorage();
const pathReference = ref(storage, 'images/3.png');
const listRef = ref(storage, 'images/');

const [address, setAddress] = useState([]);
const [photos, setPhotos] = useState([]);
console.log('photos: ', photos);

useEffect(()=>{
  console.log('useEffect');

const func = async() => {
  console.log('func');
  await listAll(listRef)
  .then((res) => {
    let arr = [];
    res.items.forEach((x) => {
      arr.push(x.fullPath);
      console.log('arr: ', arr);
    });
    setAddress(arr);
  })
  .catch((error) => {
    console.log(error);
  });
}

const func2 = async() => {
  console.log('func2');
  let arr = [];
  address.map(x => {
    const starsRef = ref(storage, x);
    getDownloadURL(starsRef)
    .then((url) => {
      arr.push({url});
      console.log('arr2: ', arr);
      if(arr.length === address.length){
        setPhotos(arr);
      }
  })})
}
func();
func2();
}, []);

const renderItem = ({ item }) => (
  <View style={a.item}>
    <Text style={a.title}>{item.url}</Text>
  </View>
);

  return (
    <View style={a.container}>
      {/* <Image source={{uri: photos[0]}} style={{width: '50%', height: '50%'}}></Image>
      <Image source={{uri: photos[1]}} style={{width: '50%', height: '50%'}}></Image> */}
      <View style={a.header}>
        <Text style={{fontSize: 30}}>앨범</Text>
      </View>
      <View style={a.main}>
        <View style={a.header2}>
          <Icon name='navicon' size={20}></Icon>
        </View>
        <FlatList style={a.main2} data={photos} renderItem={renderItem}>
          {/* <View style={a.box}>
            <View style={a.imagebox}>
              <Image source={{uri: photos[0]}} style={{width: '100%', height: '100%', borderRadius: 10,}} /> 
            </View>
            <View style={a.titlebox}>
              <Text style={{fontSize: 12}}>images</Text>
              <Text style={{fontSize: 12}}>{address.length}</Text>
            </View>
          </View>
          <View style={a.box}>
            <View style={a.imagebox}>
              <Image source={{uri: photos[0]}} style={{width: '100%', height: '100%', borderRadius: 10,}} /> 
            </View>
            <View style={a.titlebox}>
              <Text style={{fontSize: 12}}>images</Text>
              <Text style={{fontSize: 12}}>{address.length}</Text>
            </View>
          </View>
          <View style={a.box}>
            <View style={a.imagebox}>
              <Image source={{uri: photos[0]}} style={{width: '100%', height: '100%', borderRadius: 10,}} /> 
            </View>
            <View style={a.titlebox}>
              <Text style={{fontSize: 12}}>images</Text>
              <Text style={{fontSize: 12}}>{address.length}</Text>
            </View>
          </View>
          <View style={a.box}>
            <View style={a.imagebox}>
              <Image source={{uri: photos[0]}} style={{width: '100%', height: '100%', borderRadius: 10,}} /> 
            </View>
            <View style={a.titlebox}>
              <Text style={{fontSize: 12}}>images</Text>
              <Text style={{fontSize: 12}}>{address.length}</Text>
            </View>
          </View> */}
        </FlatList>
      </View>
    </View>
  )
}

export default Album