import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Navigation from './component/Navigation'
import * as SQLite from "expo-sqlite"
// import * as FileSystem  from 'expo-file-system'
// const { Asset } = require('expo-asset')
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch, connect } from 'react-redux'

const App = () => {

  const db = SQLite.openDatabase('test.db');
  const [info, setInfo] = useState([]);
  console.log('info: ', info);

  useEffect(() => {

    // async function openDatabase(){
    //   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    //     console.log('디렉토리만듬');
    //   }else console.log('디렉토리 못찾음');
    //   await FileSystem.downloadAsync(
    //     Asset.fromModule(require('./assets/test.db')).uri,
    //     FileSystem.documentDirectory + 'SQLite/test.db'
    //   );
    //   return SQLite.openDatabase('test.db');
    // }

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM golfcourse", [], (tx, results)=>{
       setInfo(results.rows._array);
        }, error => {console.log('error: ', error);});
       })
    // openDatabase();
  }, []);

  function reducer(currentState, action){
    if(currentState === undefined){
        return{
            info: info,
        }
    }
    const newState = {...currentState};
    return newState;
}
const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider> 
  )
}

export default App