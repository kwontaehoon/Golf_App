const FileSystem = require('expo-file-system');
const { Asset } = require('expo-asset');
const SQLite = require('expo-sqlite');

export default async function openDatabase() {

  const database = SQLite.openDatabase('./assets/test.db')
  database._db.close()
  
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
    }

    await FileSystem.downloadAsync(
      // Asset.fromModule(require('./assets/test.db')).uri,
      FileSystem.documentDirectory + "SQLite/test.db"
    );
    
    return SQLite.openDatabase('./assets/test.db');
}