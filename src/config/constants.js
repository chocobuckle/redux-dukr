import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBHyvBBuiZFyiMurkhW_XUp1wboe1bWq4o',
  authDomain: 'dukr-46b41.firebaseapp.com',
  databaseURL: 'https://dukr-46b41.firebaseio.com',
  projectId: 'dukr-46b41',
  storageBucket: 'dukr-46b41.appspot.com',
  messagingSenderId: '20403030069'
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const usersDucksExpirationLength = 10000000;
export const userExpirationLength = 10000000;
export const repliesExpirationLength = 30000000;
