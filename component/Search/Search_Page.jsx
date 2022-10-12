import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native'
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
    </View>
  );
}

export default Search_Page