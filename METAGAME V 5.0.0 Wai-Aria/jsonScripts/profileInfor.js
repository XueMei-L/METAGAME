import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref , onValue, child, set, update, get, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'; 

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

    get(child(currentDB, `users/${username}`)).then((snapshot) => {
        // let dbUsername = snapshot.val();
        let dbUsername = snapshot.val();
        console.log(dbUsername);
        $("#database-username").html(dbUsername.account);
        $("#database-year").html(dbUsername.year);

    }).catch((error) => {
        // $("#database-username").text('Get User data failed.');
    });

}