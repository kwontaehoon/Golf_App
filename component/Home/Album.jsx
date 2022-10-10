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
    height: '90%',
    flexDirection: 'row',
  },
  left:{
    borderWidth: 3,
    borderColor: 'black',
    flex: 1,
    alignItems: 'center',
  },
  right:{
    borderWidth: 1,
    borderColor: 'black',
    flex: 3,
  },
  main:{
    
  },
  image:{
    width: 70,
    height: 70,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title:{
    borderWidth: 1,
    borderColor: 'black',
  }
})

const Album = () => {

const app = firebaseConfig;
const storage = getStorage();
const pathReference = ref(storage, 'images/3.png');

const [title, setTitle] = useState(['', 'images/']);
const [address, setAddress] = useState([]);
console.log('address: ', address);
const [photos, setPhotos] = useState([]);
console.log('photos: ', photos);

const test = [
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
    
  },
  {
    id: 7,
  }
];

useEffect(()=>{
  console.log('useEffect');
let kwon = [];
title.map((x, index) => {

const listRef = ref(storage, x);

const func = async() => {
  console.log('func');
  await listAll(listRef)
  .then((res) => {
    let arr = [];
    res.items.forEach((x) => {
      arr.push(x.fullPath);
    });
    setAddress(arr);
    func2(arr);
  });
}

const func2 = async(a) => {
  console.log('func2');
  let arr = [];
  let arr2 = [];
  await a.map(x => {
    const starsRef = ref(storage, x);
    getDownloadURL(starsRef)
    .then((url) => {
      arr.push({url});
      if(arr.length === a.length){
        arr2 = { id: index, url: arr };
        kwon.push(arr2);
        setPhotos(kwon);
      }
  })})
}
func();

});
}, []);

const renderItem = ({ item }) => (
  <View>
    <Image style={a.image} ></Image>
    <View style={a.title}><Text>gg</Text></View>
  </View>
);

  return photos.length !== 0 ? (
    <View style={a.container}>
      <View style={a.left}>
        <View style={a.main}>
            <FlatList data={photos} renderItem={renderItem}
            horizontal={false} />
        </View>
      </View>
      <View style={a.right}></View>
      {/* <Image source={{uri: photos[0]}} style={{width: '50%', height: '50%'}}></Image>
      <Image source={{uri: photos[1]}} style={{width: '50%', height: '50%'}}></Image> */}
      
    </View>
  ) : ( <View><Text>로딩중</Text></View>)
}

export default Album