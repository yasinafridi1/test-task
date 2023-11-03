
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBikiuphIP7s2oxAnqPJVa_AA-3g0xOkrU",
    authDomain: "wedbook-96912.firebaseapp.com",
    databaseURL: "https://wedbook-96912-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedbook-96912",
    storageBucket: "wedbook-96912.appspot.com",
    messagingSenderId: "801007003369",
    appId: "1:801007003369:web:acbdb09dbe82406e6db278",
    measurementId: "G-1HQ20124ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);