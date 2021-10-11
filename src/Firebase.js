import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9L7J427hP0jbpaZ1g8PLpb3kacSjrX00",
    authDomain: "snapchat-clone-365f0.firebaseapp.com",
    projectId: "snapchat-clone-365f0",
    storageBucket: "snapchat-clone-365f0.appspot.com",
    messagingSenderId: "181334907472",
    appId: "1:181334907472:web:8896e21427b99ab46d4f55",
    measurementId: "G-HHZV5TGW0V"
};
const firebaseapp = firebase.initializeApp(firebaseConfig)
const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider }