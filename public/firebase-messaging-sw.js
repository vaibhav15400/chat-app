import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBK2ix3pk8Zop_sTEE9_B5G2rGoVuxpNAI',
  authDomain: 'chat-web-app-c0caa.firebaseapp.com',
  projectId: 'chat-web-app-c0caa',
  storageBucket: 'chat-web-app-c0caa.appspot.com',
  messagingSenderId: '64068223214',
  appId: '1:64068223214:web:436938f7d71928256533ff',
});

getMessaging(firebaseApp);
