// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth'
// this should be enough creditnials to connect to firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiYd5rusD1PGCDxOkYdqpLBaCjra5DR7o",
    authDomain: "turno-f7e41.firebaseapp.com",
    projectId: "turno-f7e41",
    storageBucket: "turno-f7e41.appspot.com",
    messagingSenderId: "691357539203",
    appId: "1:691357539203:web:fca7dbcbb806d28c2af4b6",
    measurementId: "G-XHFYW9QXX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()

export {auth}
export {db}
export const storage = getStorage(app)