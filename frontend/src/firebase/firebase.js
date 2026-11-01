// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
// apiKey: "AIzaSyBsg885SveL6Pj3C1m4NYYCxTif6NEKlRw",
// authDomain: "crowddetector-4ec11.firebaseapp.com",
// databaseURL: "https://crowddetector-4ec11-default-rtdb.firebaseio.com",
// projectId: "crowddetector-4ec11",
// storageBucket: "crowddetector-4ec11.firebasestorage.app",
// messagingSenderId: "53496450205",
// appId: "1:53496450205:web:6faf19533f412090fc1874"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const database = db;

// export default app;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
apiKey: "AIzaSyBsg885SveL6Pj3C1m4NYYCxTif6NEKlRw",
authDomain: "crowddetector-4ec11.firebaseapp.com",
databaseURL: "https://crowddetector-4ec11-default-rtdb.firebaseio.com",
projectId: "crowddetector-4ec11",
storageBucket: "crowddetector-4ec11.firebasestorage.app",
messagingSenderId: "53496450205",
appId: "1:53496450205:web:6faf19533f412090fc1874"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = db;

// New Admin Registration
export const functions = getFunctions(app, "us-central1");

export default app;
