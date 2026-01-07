// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX_EPyrjYXqR3qj0g9lbVCGyFK8Q3s2yQ",
    authDomain: "ecomunigestionsmart.firebaseapp.com",
    projectId: "ecomunigestionsmart",
    storageBucket: "ecomunigestionsmart.firebasestorage.app",
    messagingSenderId: "1035180633998",
    appId: "1:1035180633998:web:1a12ac273e4931eff03edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// 🔒 CLAVE: persistencia SOLO por sesión (se pierde al refrescar)
setPersistence(auth, browserSessionPersistence);