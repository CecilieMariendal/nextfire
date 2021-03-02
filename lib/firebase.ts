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
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Store exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillisecounds = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: string) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    
    return userDoc;
}


/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJson(doc) {
    const data = doc.data();
    return {
        ...data,

        // Firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() ?? null,
        updatedAt: data?.updatedAt.toMillis() ?? null,
    }
}
