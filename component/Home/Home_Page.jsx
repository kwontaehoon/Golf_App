import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeFirestore } from "firebase/firestore";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'

const a = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: 'black',
    },
    subcontainer:{
        borderWidth: 1,
        borderColor: 'black',
        height: 300,
        padding: 20,
    },
    box:{
        flexDirection: 'row',
        marginBottom: 20,
    },
    box2:{
        borderWidth: 1,
        borderColor: 'black',
    }
})

const Home_Page = () => {

    const app = firebaseConfig;
    const db = getFirestore(app);

    // const db2 = initializeFirestore(app, {
    //     experimentalForceLongPolling: true,
    // });
    // console.log('db2: ', db2);

    const storage_add = async() => {
        console.log('Firestore 데이터베이스 등록');
        await setDoc(doc(db, "characters", "mario"), {
          employment: "plumber",
          outfitColor: "red",
          specialAttack: "fireball"
      });
    }

    const read = async() => {
        console.log('Firebase 데이터베이스 읽기');
        const docRef = doc(db, "data", "board");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

        const querySnapshot = await getDocs(collection(db, "data"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    function storeHighScore(userId, score) {
        console.log('실시간 데이터베이스 읽기');
        const db = getDatabase();
        const dbRef = ref(getDatabase());
        console.log(db);
        console.log(dbRef);
        const starCountRef = ref(db);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('data: ', data);
        });
      }

    const write = (userId, name, age) => {
        console.log('실시간 데이터베이스 쓰기');
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: name,
          age: age,
        });
      }

  return (
    <View style={a.container}>
        <View style={a.subcontainer}>
            <View style={a.box}>
                <Text style={{fontSize: 20}}>Firebase database: </Text>
                <TouchableOpacity style={a.box2} onPress={storage_add}>
                    <Text style={{fontSize: 20}}>데이터 등록</Text>
                </TouchableOpacity>
            </View>
            <View style={a.box}>
                <Text style={{fontSize: 20}}>Firebase database: </Text>
                <TouchableOpacity style={a.box2} onPress={read}>
                    <Text style={{fontSize: 20}}>데이터 읽기</Text>
                </TouchableOpacity>
            </View>
            <View style={a.box}>
                <Text style={{fontSize: 20}}>Realtime database: </Text>
                <TouchableOpacity style={a.box2} onPress={storeHighScore}>
                    <Text style={{fontSize: 20}}>데이터 읽기</Text>
                </TouchableOpacity>
            </View>
            <View style={a.box}>
                <Text style={{fontSize: 20}}>Realtime database: </Text>
                <TouchableOpacity style={a.box2} onPress={()=>write(1, 'kwon', 26)}>
                    <Text style={{fontSize: 20}}>데이터 쓰기</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default Home_Page