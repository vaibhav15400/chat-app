/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBK2ix3pk8Zop_sTEE9_B5G2rGoVuxpNAI',
  authDomain: 'chat-web-app-c0caa.firebaseapp.com',
  projectId: 'chat-web-app-c0caa',
  storageBucket: 'chat-web-app-c0caa.appspot.com',
  messagingSenderId: '64068223214',
  appId: '1:64068223214:web:436938f7d71928256533ff',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BO0HR5_AYglBOxgSr0roXGMG3Zs4kMPktDGW0z6pdU8-oKchu5zHF0Z3N0x0zbqB8LbmZyFFnHbUp8OW1fZGDE0'
  );
  messaging.onMessage(data => {
    console.log('DATA', data);
  });
}
