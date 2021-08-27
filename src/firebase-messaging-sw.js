importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
 
firebase.initializeApp({
  apiKey: "AIzaSyDHsflURkffjc7-EoZdkvrvkackVD-JJEQ",
  authDomain: "nowverifycap.firebaseapp.com",
  projectId: "nowverifycap",
  storageBucket: "nowverifycap.appspot.com",
  messagingSenderId: "78693282361",
  appId: "1:78693282361:web:c03e0bfb6f2294c4fbd3e8",
  measurementId: "G-Z3TV886JGJ"
  
});
 
// firebase.initializeApp(firebase);

if (firebase.messaging.isSupported()) {
  firebase.messaging();
}else{
  console.log('not supported=======1=====1=1======11===1=1====1=')
}