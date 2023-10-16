import { Workbox } from 'workbox-window';
// Workbox make sthe implementation of service workers easier by saying which resources we want to cache and how
import Editor from './editor';
import { putDb, getDb } from './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Just a loading indicator 
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// ------------------------
// this might be necessary
// referenced from activity 23

const Area = document.getElementById('text-editor');

Area.addEventListener('submit', (event) => {
  // Handle the form data
  event.preventDefault();
  const textLine = textLine.elements['text'].value;

  // Put (change) form data in IndexedDB
  putDb(textLine);

  // This area needs to change the value not add to it

  Area.reset();
  fetchList();
});

const fetchList = async () => {
  // Get specific data from IndexedDB
  const result = await getDb();

  let listItem = ` `;

  // Loop through the data and create the contact listItem
  for (let data of result) {
    console.log(data);
    console.log(" data recording working");
    listItem += `
    <div class="flex-row align-center justify-space between" id="${data.id}">
      <li class="mr-2" id="list-item" onclick="deleteItem(this)">${data.todo}</li>
      <button class="btn btn-sm btn-info" onclick="editList(this)" id="edit-btn">Edit</button>
    </div>
    `;
  }

  // Setting innerHTML as listItem variable
  document.getElementById('list-group').innerHTML = listItem;
};

fetchList();

// ------------------------

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
  console.log("SW registered: " + workboxSW);
} else {
  console.error('Service workers are not supported in this browser.' + registerationError);
}

// If the service worker is in navigator then register a new service worker else console not supported

// Action may not be needed 

// activity 15
//  VVVVVV

// // Append the new element to the target element
// targetEl.appendChild(moduleContent);

// // register a service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .then((register) => console.log(register));
// }
// ---------------------------------------------------

// import { Workbox } from 'workbox-window';

// const register = () => {
//   // service worker should be installed only in prod env.
//   if (process.env.NODE_ENV !== 'production') {
//     return;
//   }
//   // check if browser supports SW before register.
//   if ('serviceWorker' in navigator) {
//     const wb = new Workbox('/company/sw.js');

//     wb.register().then((registration) => {
//       console.log('Registration success', registration.scope);
//     }).catch((err) => {
//       console.log('Registration failed', err);
//     });
//   }
// };

// register();