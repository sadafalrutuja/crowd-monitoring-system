// // // // // import { initializeApp } from "firebase/app";
// // // // // import { getAuth } from "firebase/auth";
// // // // // import { getFirestore } from "firebase/firestore";
// // // // // import { getFunctions } from "firebase/functions";
// // // // // const firebaseConfig = {
// // // // // apiKey: "AIzaSyBsg885SveL6Pj3C1m4NYYCxTif6NEKlRw",
// // // // // authDomain: "crowddetector-4ec11.firebaseapp.com",
// // // // // databaseURL: "https://crowddetector-4ec11-default-rtdb.firebaseio.com",
// // // // // projectId: "crowddetector-4ec11",
// // // // // storageBucket: "crowddetector-4ec11.firebasestorage.app",
// // // // // messagingSenderId: "53496450205",
// // // // // appId: "1:53496450205:web:6faf19533f412090fc1874"
// // // // // };
// // // // // const app = initializeApp(firebaseConfig);
// // // // // export const auth = getAuth(app);
// // // // // export const db = getFirestore(app);
// // // // // export const database = db;
// // // // // // New Admin Registration
// // // // // export const functions = getFunctions(app, "us-central1");
// // // // // export default app;


// // // // import { initializeApp } from "firebase/app";

// // // // import { getAuth } from "firebase/auth";

// // // // import { getDatabase } from "firebase/database";

// // // // import { getFunctions } from "firebase/functions";

// // // // // Firebase Configuration
// // // // const firebaseConfig = {
// // // //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// // // //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// // // //   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
// // // //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// // // //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// // // //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// // // //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // // // };

// // // // // Initialize Firebase
// // // // const app = initializeApp(firebaseConfig);

// // // // // Firebase Authentication
// // // // export const auth = getAuth(app);

// // // // // Firebase Realtime Database
// // // // export const database = getDatabase(app);

// // // // // Firebase Cloud Functions
// // // // export const functions = getFunctions(app, "us-central1");

// // // // export default app;


// // // import { initializeApp } from "firebase/app";
// // // import { getAuth } from "firebase/auth";
// // // import { getFirestore } from "firebase/firestore";
// // // import { getFunctions } from "firebase/functions";

// // // const firebaseConfig = {
// // //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// // //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// // //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// // //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// // //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// // //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // // };

// // // const app = initializeApp(firebaseConfig);

// // // export const auth = getAuth(app);

// // // export const db = getFirestore(app);

// // // export const functions = getFunctions(app, "us-central1");

// // // export default app;


// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// // import { getDatabase } from "firebase/database";
// // import { getFunctions } from "firebase/functions";

// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

// //   databaseURL:
// //     import.meta.env.VITE_FIREBASE_DATABASE_URL,

// //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // };

// // const app = initializeApp(firebaseConfig);

// // // Firebase Authentication
// // export const auth = getAuth(app);

// // // Cloud Firestore
// // export const db = getFirestore(app);

// // // Firebase Realtime Database
// // export const database = getDatabase(app);

// // // Firebase Cloud Functions
// // export const functions = getFunctions(app, "us-central1");

// // export default app;


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getFunctions } from "firebase/functions";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

//   databaseURL:
//     import.meta.env.VITE_FIREBASE_DATABASE_URL,

//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);

// // Firebase Authentication
// export const auth = getAuth(app);

// // Cloud Firestore
// export const db = getFirestore(app);

// // Firebase Realtime Database
// export const database = getDatabase(app);

// // Firebase Cloud Functions
// export const functions = getFunctions(app, "us-central1");

// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Cloud Firestore
export const db = getFirestore(app);

// Firebase Realtime Database
export const database = getDatabase(app);

// Firebase Cloud Functions
export const functions = getFunctions(app, "us-central1");

export default app;