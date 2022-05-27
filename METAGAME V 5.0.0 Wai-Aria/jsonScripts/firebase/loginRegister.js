import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref , onValue, child, set, update, get, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'; 
import * as firebaseAuth from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8C7FZP3oD1cAtjEt_GNi0SqyDRqtO1ps",
  authDomain: "metagame-9b42d.firebaseapp.com",
  databaseURL: "https://metagame-9b42d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "metagame-9b42d",
  storageBucket: "metagame-9b42d.appspot.com",
  messagingSenderId: "77098664441",
  appId: "1:77098664441:web:fc5001254ba7f8eeffbd28"
};


// Set up our register function
export function register () {
  const app = initializeApp(firebaseConfig);
  // Initialize variables
  console.log(firebaseAuth);
  const auth = firebaseAuth.getAuth();
  // Get all our input fields
  let email = $("#email").val()
  let password = $("#password").val()
  let username = $("#username").val()
  let dni = $("#dni").val()
  let birthdate = $("#birthdate").val()

  // Validate input fields
  // if (validate_email(email) == false || validate_password(password) == false) {
  //   alert('correo invalido')
  //   return
  //   // Don't continue running the code
  // }
  // if (validate_password(password) == false) {
  //   alert('contraseña invalida')
  //   return
  //   // Don't continue running the code
  // }
  // if (validate_field(username) == false) {
  //   alert('usuario invalido')
  //   return
  // }
 
  // Move on with Auth
  firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser
    // Add this user to Firebase Database
    var database_ref = getDatabase();
    // Create User data
    let discount = 0;
    var user_data = {
      email : email,
      username : username,
      discount: discount,
      dni : dni,
      birthdate: birthdate,
      last_login : Date.now()
    }
    console.log(user.uid)
    set(ref(database_ref, 'users/' + user.uid),user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
export function login () {
  const app = initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebaseAuth.getAuth();
  const database = getDatabase();
  // Get all our input fields
  let email = $("#email").val()
  let password = $("#password").val()


  firebaseAuth.signInWithEmailAndPassword(auth, email, password)
  .then(function(userCredential) {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = getDatabase();

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    set(ref(database_ref, 'users/' + user.uid + '/last_login'),user_data)

    // DOne
    alert('Inicio de sesion correcto')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  if (email.length > 6) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
} 