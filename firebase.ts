import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAWh7kpm6sk5xc-po89u7LR2Y1aDCRzSOQ",
    authDomain: "dropbox-clone-a3ef7.firebaseapp.com",
    projectId: "dropbox-clone-a3ef7",
    storageBucket: "dropbox-clone-a3ef7.appspot.com",
    messagingSenderId: "865790770065",
    appId: "1:865790770065:web:715ece69e427219430b830"
  };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    export { db, auth, storage };