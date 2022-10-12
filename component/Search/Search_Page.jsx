import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native'
import * as SQLite from "expo-sqlite";
import * as FileSystem  from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';

const a = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 50,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle:{
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button:{
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
const Search_Page = () => {

  const db = SQLite.openDatabase('test.db');
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
    uploadBytes(storageRef, selectedImage.localUri).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };

  const insert = () => {
    console.log('insert');
    db.transaction((tx) => {
      tx.executeSql(
        'insert into kwon(id, name) values(2, kk)', [],
        (tx, results)=>{
          console.log('dddddddd: ', results);
        });
    })

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM kwon", [], (tx, results)=>{
       console.log(results.rows._array);
        }, error => {console.log('error: ', error);});
       })
    console.log('complete');
  }

  if (selectedImage !== null) {
    return (
      <View style={a.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={a.thumbnail}
        />
      </View>
    );
  }

  return (
    <View style={a.container}>
      <TouchableOpacity style={a.button} onPress={openImagePickerAsync}>
        <Text>버튼</Text>
      </TouchableOpacity>
      <TouchableOpacity style={a.button} onPress={insert}>
        <Text>insert</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Search_Page