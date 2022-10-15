import { initializeApp } from 'firebase/app';
import envConfig from './envConfig';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: envConfig.REACT_APP_FIREBASE_KEY,
  authDomain: envConfig.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: envConfig.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: envConfig.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: 'sender-id',
  appId: envConfig.REACT_APP_FIREBASE_APP_ID,
  //   measurementId: 'G-measurement-id',
};

let myApp = initializeApp(firebaseConfig);
let db = getDatabase(myApp);

export { db, myApp };
