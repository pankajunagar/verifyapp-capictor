importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
 
firebase.initializeApp({
  apiKey: "AIzaSyBWwl-fvDoiwidxf0hbXUlf6CpfP7tSap0",
  authDomain: "nowverifyit-f7758.firebaseapp.com",
  projectId: "nowverifyit-f7758",
  storageBucket: "nowverifyit-f7758.appspot.com",
  messagingSenderId: "182516696535",
  appId: "1:182516696535:web:ad6e088a36b54a9e387792",
  measurementId: "G-V4Y8C7JGRH"
  
});
 
const messaging = firebase.messaging();