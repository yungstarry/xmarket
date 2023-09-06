import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "eshop-66054.firebaseapp.com",
  projectId: "eshop-66054",
  storageBucket: "eshop-66054.appspot.com",
  messagingSenderId: "818044046349",
  appId: "1:818044046349:web:89fd04bd71844127bd9944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
