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
export const putDb = async (content) =>{

  const jateDb = await openDB('jate', 1);
  const change = jateDb.transaction('jate', '');

  console.error('putDb not implemented');

}



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
