import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref , onValue, child, set, update, get, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'; 
import * as firebaseAuth from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyC8C7FZP3oD1cAtjEt_GNi0SqyDRqtO1ps",
  authDomain: "metagame-9b42d.firebaseapp.com",
  databaseURL: "https://metagame-9b42d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "metagame-9b42d",
  storageBucket: "metagame-9b42d.appspot.com",
  messagingSenderId: "77098664441",
  appId: "1:77098664441:web:fc5001254ba7f8eeffbd28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function showProfileData(username) {
    const currentDB = ref(getDatabase());
    const auth = firebaseAuth.getAuth();
    auth.onAuthStateChanged(function(user) {
    if (user) {
        get(child(currentDB, `users/${user.uid}`)).then((snapshot) => {
            // let dbUsername = snapshot.val();
            let dbUsername = snapshot.val();
            console.log(dbUsername);
            $("#database-username").html(dbUsername.username);
            $("#database-dni").html(dbUsername.dni);
            $("#database-email").html(dbUsername.email);
            $("#database-username").html(dbUsername.account);
            $("#database-birthdate").html(dbUsername.birthdate);
    
        }).catch((error) => {
            // $("#database-username").text('Get User data failed.');
        });
    } else {
      console.log('logged out')
    }
  });
}

export function isUserLogged() {
    const app = initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebaseAuth.getAuth();
    auth.onAuthStateChanged(function(user) {
    if (user) {
        location.href = "./profile.html"
    } else {
        location.href = "./login.html"
    }
  });
}

export function getLoginStatusToProfile() {
    // Initialize variables
    const auth = firebaseAuth.getAuth();
    auth.onAuthStateChanged(function(user) {
    if (user) {
      location.href = "./profile.html"
    } else {
      alert('No hay usuario conectado, inicie sesion primero');
    }
  });
}

export function signOutProfile() {
    const auth = firebaseAuth.getAuth();
    auth.signOut(auth).then(() => {
     alert('Se ha cerrado la sesion')
     location.href= "./login.html"
    }).catch((error) => {
    // An error happened.
    });
}