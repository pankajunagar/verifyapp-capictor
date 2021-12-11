importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
 
firebase.initializeApp({
  apiKey: "AIzaSyBWwl-fvDoiwidxf0hbXUlf6CpfP7tSap0",
  authDomain: "nowverifyit-f7758.firebaseapp.com",
  projectId: "nowverifyit-f7758",
  storageBucket: "nowverifyit-f7758.appspot.com",
  messagingSenderId: "182516696535",
  appId: "1:182516696535:web:ad6e088a36b54a9e387792",
  measurementId: "G-V4Y8C7JGRH"





  // apiKey: "AIzaSyDHsflURkffjc7-EoZdkvrvkackVD-JJEQ",
  // authDomain: "nowverifycap.firebaseapp.com",
  // projectId: "nowverifycap",
  // storageBucket: "nowverifycap.appspot.com",
  // messagingSenderId: "78693282361",
  // appId: "1:78693282361:web:c03e0bfb6f2294c4fbd3e8",
  // measurementId: "G-Z3TV886JGJ"
  
});
 
// firebase.initializeApp(firebase);

if (firebase.messaging.isSupported()) {
  firebase.messaging();
}else{
  console.log('not supported=======1=====1=1======11===1=1====1=')
}