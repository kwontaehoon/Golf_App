import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getStorage, ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"
import firebaseConfig from '../../firebase'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';

// react-native reanimated
// reanimated-bottom-sheet
// react-native-image-crop-picker

const a = StyleSheet.create({
  container:{
    height: '92.2%',
    flexDirection: 'row',
  },
  container2:{
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addbox:{
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  left:{
    borderWidth: 2,
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
    borderWidth: 1,
    borderColor: 'black',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photos:{
    width: '33.3333%',
    height: 80,
  }
})

const Album = () => {

const app = firebaseConfig;
const storage = getStorage();
const pathReference = ref(storage, 'images/3.png');
const storageRef = ref(storage, 'images/mountains.jpeg');

const [title, setTitle] = useState(['','images/']);
const [photos, setPhotos] = useState([]);
console.log('photos: ', photos);
const [album, setAlbum] = useState(0); // 앨범 터치하면 display
const [test, setTest] = useState(0); // useeffect 끝나면 photo length
const [selectedImage, setSelectedImage] = useState({localUri: null});
console.log(selectedImage);
if(selectedImage !== null){
  console.log(selectedImage.localUri);
}


useEffect(()=>{
  console.log('useEffect');
let kwon = [];


const func = () => {
  console.log('func');
  title.map((x, index) => {

    const listRef = ref(storage, x);
  listAll(listRef)
  .then((res) => {
    let arr = [];
    res.items.forEach((x) => {
      arr.push(x.fullPath);
    });  
    func2(arr, index);
  });
});
}

const func2 = (a, index) => {
  console.log('func2');
  let arr = [];
  let arr2 = [];
  a.map(x => {
    console.log('x: ', x);
    const starsRef = ref(storage, x);
    getDownloadURL(starsRef)
    .then((url) => {
      arr.push({url});
      if(arr.length === a.length){
        arr2 = { id: index+1, url: arr };
        kwon.push(arr2);
        setPhotos(kwon);
        setTest(kwon.length);
      }
  })})
}
func();


}, []);

const List1 = () => {
  let arr = [];

  photos[album].url.map((x, index) => {
  switch(true){
    case album === 2 : arr.push(<Image style={a.photos} source={{uri: x.url}} key={index}></Image>); break;
    default: arr.push(
      <Image style={a.photos} source={{uri: x.url}} key={index}></Image>
    );
  }
})
return arr;
}

let openImagePickerAsync = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  if (pickerResult.cancelled === true) {
    return;
  }
  setSelectedImage({ localUri: pickerResult.uri });
  const metadata = {
    contentType: 'image/jpeg',
  };
  const uploadTask = uploadBytes(storageRef, selectedImage.localUri, metadata);
  // uploadBytes(storageRef, selectedImage.localUri).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
};

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => setAlbum(item.id-1)}>
    <Image style={a.image} source={{uri: item.url[0].url}}></Image>
    <View style={a.title}><Text>앨범{item.id}</Text></View>
  </TouchableOpacity>
);

  return test === title.length ? (
    <View style={a.container}>
       <TouchableOpacity style={a.addbox} onPress={openImagePickerAsync}>
          <Icon name='plus' size={18} />
        </TouchableOpacity>
      <View style={a.left}>
        <View style={a.main}>
            <FlatList data={photos} renderItem={renderItem}
            horizontal={false} />
        </View>
      </View>
      <View style={a.right}>
        <List1 />
      </View>
      {/* <Image source={{uri: photos[0]}} style={{width: '50%', height: '50%'}}></Image>
      <Image source={{uri: photos[1]}} style={{width: '50%', height: '50%'}}></Image> */}
      
    </View>
  ) : ( <View style={a.container2}>
        <ActivityIndicator size="large" color='skyblue' />
      </View>)
}

export default Album