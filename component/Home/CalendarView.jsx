import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from "react-native-calendars"

const a = StyleSheet.create({
    container:{
        width: 300,
        height: 350,
        position: 'absolute',
        backgroundColor: 'white',
        top: '15%',
        left: '14%',
        zIndex: 100,
        padding: 10,
        borderRadius: 15,
    },
})

const CalendarView = ({scroll, setScroll, selectDate, setSelectdate}) => {

    const select = (e, f) => {
        console.log(e);
        console.log(f);

        const arr = {[e]: {selected: true}};
        setSelectdate(e);
        setScroll(!scroll);
    }
  return (
    <View style={[a.container, {display: scroll ? 'flex' : 'none'}]}>     
        <View>
            <Calendar onDayPress={(day) => select(day.dateString, day.day)}
            markedDates={selectDate} />
        </View>
    </View>
  )
}

export default CalendarView