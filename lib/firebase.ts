import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAih6BKu22fnTj0_BYbnwoyRJNLj3XQNKQ",
    authDomain: "nextfire-e00c1.firebaseapp.com",
    projectId: "nextfire-e00c1",
    storageBucket: "nextfire-e00c1.appspot.com",
    messagingSenderId: "1072930395657",
    appId: "1:1072930395657:web:362a01fb3da3f190650ad8",
    measurementId: "G-4NR8J7DZKC",
}

if (! firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();