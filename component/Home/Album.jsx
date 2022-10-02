import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { getStorage, ref, listAll } from "firebase/storage"
import firebaseConfig from '../../firebase'

// react-native reanimated
// reanimated-bottom-sheet
// react-native-image-crop-picker

const Album = () => {

// Create a root reference
const app = firebaseConfig;
const storage = getStorage(app);
const listRef = ref(storage, 'images/');

const pathReference = ref(storage, 'images/3x4 1.jpg');

console.log('pathReference: ', pathReference);
console.log(pathReference.bucket);
const a = pathReference.bucket;

useEffect(()=>{

console.log('useEffect');
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log('folderRef: ', folderRef);
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log('itemRef: ', itemRef);
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log('error: ', error);
  });

}, []);


  return (
    <View>
      <Text>dd</Text>
      <Image source={{uri: a}}></Image>
    </View>
  )
}

export default Album