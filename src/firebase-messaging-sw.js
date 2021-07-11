importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
 
<<<<<<< HEAD
firebase.initializeApp({
  apiKey: "AIzaSyBWwl-fvDoiwidxf0hbXUlf6CpfP7tSap0",
  authDomain: "nowverifyit-f7758.firebaseapp.com",
  projectId: "nowverifyit-f7758",
  storageBucket: "nowverifyit-f7758.appspot.com",
  messagingSenderId: "182516696535",
  appId: "1:182516696535:web:ad6e088a36b54a9e387792",
  measurementId: "G-V4Y8C7JGRH"
=======
var firebaseConfig={
    apiKey: "AIzaSyBLyi69trc6HToB7IB9Id_odPAJbAWLLhg",
  authDomain: "noeverifycaptest.firebaseapp.com",
  projectId: "noeverifycaptest",
  storageBucket: "noeverifycaptest.appspot.com",
  messagingSenderId: "4748763519",
  appId: "1:4748763519:web:18c2bf0af2d07b332f7a4a"
>>>>>>> devharsh
  
};
 
firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  firebase.messaging();
}else{
  console.log('not supported=======1=====1=1======11===1=1====1=')
}