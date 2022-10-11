import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import * as SQLite from "expo-sqlite";
import * as FileSystem  from 'expo-file-system'
import launchImageLibrary from 'react-native-image-picker';

const a = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 50,
    height: 500,
  },
  circle:{
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
const Search_Page = () => {

  const [response, setResponse] = useState(null);
  const onSelectImage = () => {
    console.log('aa');

    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 512,  
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      (res) => {
        console.log(res);
        if (res.didCancel) return;
        setResponse(res);
      },
    )
  }

  return (
    <View style={a.container}>
      <Text>gg</Text>
      <Pressable style={a.circle} onPress={onSelectImage}>
        <Image style={a.circle} source={{uri: response?.assets[0]?.uri}} />
      </Pressable>
    </View>
  )
}

export default Search_Page