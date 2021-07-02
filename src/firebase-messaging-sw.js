importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyBLyi69trc6HToB7IB9Id_odPAJbAWLLhg",
  authDomain: "noeverifycaptest.firebaseapp.com",
  projectId: "noeverifycaptest",
  storageBucket: "noeverifycaptest.appspot.com",
  messagingSenderId: "4748763519",
  appId: "1:4748763519:web:18c2bf0af2d07b332f7a4a"
  
});
 
const messaging = firebase.messaging();