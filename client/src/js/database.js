import { openDB } from 'idb';

// This file is to not only store but remove cash files that are unimportant

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



// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // ---------------------------------
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

/*
  //---------------------------------
  const jateDb = await openDB('jate', 1);

  const change = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = change.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ jate: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data has been updated in the database', result);

  // console.error('putDb not implemented');

}
*/


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(id);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}


initdb();
