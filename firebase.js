const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json'); // Reemplaza con la ruta a tu archivo de clave de servicio de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com', // Reemplaza con la URL de tu proyecto de Firebase
});

const db = admin.firestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPgPOGSaitYNC_Fa0au7WM6T3n5D2sGyM",
  authDomain: "sebaredmaru.firebaseapp.com",
  projectId: "sebaredmaru",
  storageBucket: "sebaredmaru.appspot.com",
  messagingSenderId: "320798715122",
  appId: "1:320798715122:web:6674eb64f1928003b3346b",
  measurementId: "G-K22S7D36J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);