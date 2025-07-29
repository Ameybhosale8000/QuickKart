import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyCs2O2HO1-PuaJn3mMO6t1jMQUhrXi0Shg",
  authDomain: "quickproject12.firebaseapp.com",
  databaseURL: "https://quickproject12-default-rtdb.firebaseio.com",
  projectId: "quickproject12",
  storageBucket: "quickproject12.appspot.com", // ✅ Fixed
  messagingSenderId: "671804803231",
  appId: "1:671804803231:web:ff9cca0521eaba51b13aaa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // ✅ Initialize Realtime Database

export { database };
