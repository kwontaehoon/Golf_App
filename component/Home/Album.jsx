import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
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
    alignItems: 'flex-end',
    padding: 3,
  },
  right:{
    borderWidth: 2,
    borderColor: 'black',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photos:{
    borderWidth: 1,
    borderColor: 'black',
    width: '33.3333%',
    height: 60,
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
console.log(photos.length);
const [album, setAlbum] = useState(0);


useEffect(()=>{
  console.log('useEffect');
let kwon = [];
title.map((x, index) => {

const listRef = ref(storage, x);

const func = async() => {
  console.log('func');
  listAll(listRef)
  .then((res) => {
    let arr = [];
    res.items.forEach((x) => {
      arr.push(x.fullPath);
    });  
    func2(arr);
  });
}

const func2 = async(a) => {
  console.log('func2');
  console.log('a: ', a);
  let arr = [];
  let arr2 = [];
  await a.map(x => {
    const starsRef = ref(storage, x);
    getDownloadURL(starsRef)
    .then((url) => {
      arr.push({url});
      console.log('arr: ',arr);
      if(arr.length === a.length){
        console.log('이잉');
        arr2 = { id: index+1, url: arr };
        kwon.push(arr2);
        setPhotos(kwon);
      }
  })})
}
func();

});
}, []);

const List1 = () => {
  let arr = [];
  if(title.length === photos.length){
    console.log('aaaaaaaaaaaaaaaaaaaaaa');
    console.log(photos.length);
    console.log(title.length);
  photos[album].url.map((x, index) => {
  switch(true){
    case album === 2 : arr.push(<Image style={a.photos} source={{uri: x.url}} key={index}></Image>); break;
    default: arr.push(
      <Image style={a.photos} source={{uri: x.url}} key={index}></Image>
      
    );
  }
})
  }
return arr;
}

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => setAlbum(item.id)}>
    <Image style={a.image} source={{uri: item.url[0].url}}></Image>
    <View style={a.title}><Text>앨범{item.id}</Text></View>
  </TouchableOpacity>
);

  return photos.length === 2 ? ( 
    <View style={a.container}>
      <View style={a.left}>
        <View style={a.main}>
            <FlatList data={photos} renderItem={renderItem}
            horizontal={false} />
        </View>
      </View>
      <View style={a.right}>
        {/* <List1 /> */}
      </View>
      {/* <Image source={{uri: photos[0]}} style={{width: '50%', height: '50%'}}></Image>
      <Image source={{uri: photos[1]}} style={{width: '50%', height: '50%'}}></Image> */}
      
    </View>
  ) : ( <View><Text>로딩중</Text></View>)
}

export default Album