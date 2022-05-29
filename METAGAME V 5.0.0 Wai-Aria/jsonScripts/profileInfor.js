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
            const pfpTag = document.getElementById('pfp');
            if (dbUsername.pfp === undefined) {
              pfpTag.src='./img/nopfp.png'
            } else {
              pfpTag.src=dbUsername.pfp
            }
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

export function showType(fileInput) {
  const files = fileInput.files;

  for (let i = 0; i < files.length; i++) {
    const name = files[i].name;
    console.log(files[i])
    const type = files[i].type;
    alert("Filename: " + name + " , Type: " + type);
  }
}

export function loadPFP() {
  const file = document.getElementById('pfpImageUpload').files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = function() {
    let imgBase64 = reader.result
    const auth = firebaseAuth.getAuth();  
    var database_ref = getDatabase();
    auth.onAuthStateChanged(function(user) {
      if (user) {
        get(child(ref(database_ref), `users/${user.uid}/pfp`)).then((snapshot) => {
          //console.log(snapshot.val())
          
          let pfp = imgBase64;
          console.log('ok')
          // Push to Firebase Database
          set(ref(database_ref, 'users/' + user.uid + '/pfp'),pfp)
          location.reload(); 
          //console.log(current_cart)
        }).catch((error) => {
        });
      } else {
        alert('No hay usuario conectado, inicie sesion primero');
      }
    });
  };
}
