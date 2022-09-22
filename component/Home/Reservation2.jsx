import React, {useState, useEffect ,useRef } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'

const a = StyleSheet.create({
    container:{
        width: 300,
        height: 300,
        position: 'absolute',
        backgroundColor: 'white',
        top: '10%',
        left: '15%',
        zIndex: 100,
    },
    header:{
        borderWidth: 1,
        borderColor: 'black',
        height: 30,
        alignItems: 'flex-end',
        paddingLeft: 20,
        justifyContent: 'center',
    }
})

const Reservation2 = ({scroll, setScroll}) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
          toValue: scroll ? 0 : -1000,
          useNativeDriver: true, // 애니메이션 처리작업을 자바스크립트 엔진이 아닌
          // 네이티브 레벨에서 진행하게 하는 옵션
        }).start();
      }, [scroll]);

  return (
    <Animated.View style={[a.container, {display: scroll ? 'flex' : 'none'}]}>
        <View style={a.header}>
            <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', marginRight: 20}} onPress={()=>setScroll(!scroll)}>
                <Text>닫기</Text>
            </TouchableOpacity>
        </View>
    </Animated.View>
  )
}

export default Reservation2