import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const Store = () => {

  const number = useSelector(state=>state.info);
  console.log(number);

  return (
    <View>
      <Text>gg</Text>
    </View>
  )
}

export default Store