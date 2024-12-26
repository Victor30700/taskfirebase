// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHyzMEsaV4ckCqdBWQSIqmagZv_hO0LWw",
    authDomain: "tareasfirebase-6ee19.firebaseapp.com",
    projectId: "tareasfirebase-6ee19",
    storageBucket: "tareasfirebase-6ee19.firebasestorage.app",
    messagingSenderId: "72131834476",
    appId: "1:72131834476:web:5b81047782e6f2f7afde49",
    measurementId: "G-MC7WMKEFYF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la base de datos
export const db = getFirestore(app);
