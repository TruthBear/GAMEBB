import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routing/router';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAqyBfHsBwfXODG0fj1yEZJSTQx2YcPfoM",
  authDomain: "gamebb-comment.firebaseapp.com",
  projectId: "gamebb-comment",
  storageBucket: "gamebb-comment.appspot.com",
  messagingSenderId: "733693411497",
  appId: "1:733693411497:web:1c967307c05bbfd2c0a9b8",
  measurementId: "G-K6EKT45RXT"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
