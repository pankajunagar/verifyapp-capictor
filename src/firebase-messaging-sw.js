importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
 
var firebaseConfig={
    apiKey: "AIzaSyBLyi69trc6HToB7IB9Id_odPAJbAWLLhg",
  authDomain: "noeverifycaptest.firebaseapp.com",
  projectId: "noeverifycaptest",
  storageBucket: "noeverifycaptest.appspot.com",
  messagingSenderId: "4748763519",
  appId: "1:4748763519:web:18c2bf0af2d07b332f7a4a"
  
};
 
firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  firebase.messaging();
}else{
  console.log('not supported=======1=====1=1======11===1=1====1=')
}