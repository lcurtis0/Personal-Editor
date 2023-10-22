import { openDB } from 'idb';

// This file is to not only store but remove cash files that are unimportant but add new ones once updated

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // If the database's objectStoreNames contains jate then message and set key path to id and autoincrement it
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true
      });
      console.log('jate database created');
    },
  });



// PUT Db to uddate the information for new edits
export const putDb = async (content) => {

  // ---------------------------------
  console.log('PUT to the database');
  // Under normal situations it would be ('jate', id). However, since we are trying to remeber one object 1 is all thats needed
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Text = Value key
  const request = store.put({ id: 1, text: content });
  const result = await request;
  console.log('Data saved to the database', result.text);
};


// GET Db to recieve the text information
export const getDb = async (content) => {

  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // * In the file "client\src\js\database.js", when retrieving data from the "getDb" method, retrieve specific data by ID value from the "objectStore" instead of calling the "get" method without argument.
  const request = store.tx.objectStore('jate', 1);
  //const request = store.get({ id: 1, text: content });
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.text)
    : console.log('Data not found in the database');
  // Check if a variable is defined and if it is, return it. 
  return result?.text;
}

initdb();
