import { Workbox } from 'workbox-window';
// Workbox make sthe implementation of service workers easier by saying which resources we want to cache and how
import Editor from './editor';
import { putDb, getDb } from './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Just a loading indicator this is only for front end
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

// ------------------------

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
  // This okay because Indexxed DB it can be saved as an object 
  console.log("SW registered: " + workboxSW);
} else {
  console.error('Service workers are not supported in this browser.' + registerationError);
}

// If the service worker is in navigator then register a new service worker else console not supported


