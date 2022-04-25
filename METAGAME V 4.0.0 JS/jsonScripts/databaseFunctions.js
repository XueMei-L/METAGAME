import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref , onValue, child, set, update, get } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'; 

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

export function getPricesFromDB() {
  const db = getDatabase();
  const productsReference = ref(db, 'products/');
  onValue(productsReference, (snapshot) => {
    $("#ark-price").text(snapshot.val().ARK.price + '€');
    $("#eldenring-price").text(snapshot.val()["Elden Ring"].price + '€');
    $("#gta-price").text(snapshot.val().GTAV.price + '€');
    $("#overcooked-price").text(snapshot.val().Overcooked.price + '€');
    $("#valheim-price").text(snapshot.val().Valheim.price + '€');
    $("#lostark-price").text(snapshot.val()["Lost Ark"].price);
    $("#dyinglight2-price").html('<strike>'+(snapshot.val()["Dying Light 2"].price)+'</strike>' + ' ' + ((snapshot.val()["Dying Light 2"].price)-(snapshot.val()["Dying Light 2"].price)*(snapshot.val()["Dying Light 2"].discount)).toFixed(2).toString() + '€');
    $("#citiesskylines-price").html('<strike>'+(snapshot.val()["Cities Skylines"].price)+'</strike>' + ' ' + ((snapshot.val()["Cities Skylines"].price)-(snapshot.val()["Cities Skylines"].price)*(snapshot.val()["Cities Skylines"].discount)).toFixed(2).toString() + '€');
    $("#stardew-price").html('<strike>'+(snapshot.val()["Stardew Valley"].price)+'</strike>' + ' ' + ((snapshot.val()["Stardew Valley"].price)-(snapshot.val()["Stardew Valley"].price)*(snapshot.val()["Stardew Valley"].discount)).toFixed(2).toString() + '€');
  });
}


export function purgeCartFromDB(user) {
  const currentDB = ref(getDatabase());
  get(child(currentDB, `users/${user}/current_cart`)).then((snapshot) => {
    let current_cart = snapshot.val()
    if (current_cart.length < 1) {
      alert('El carro esta vacio')
      return;
    }
    console.log(snapshot.val())
    current_cart = []
    console.log(current_cart)
    const updates = {};
    updates['users/' + id + '/current_cart'] = current_cart;
    update(ref(db), updates)
    alert('Se han borrado todos los elementos del carro')
  });
}




export function getCartFromDB(user) {
  const currentDB = ref(getDatabase());
  get(child(currentDB, `users/${user}/current_cart`)).then((snapshot) => {
    let current_cart = snapshot.val()
    let wholeString = ''
    current_cart.forEach((item) => {
      wholeString += item.product + ` ${item.price}`  + '€' + '<br>'
    }).catch((error) => {
      alert('El carro esta vacio')
    });
    
    $("#cart-Paragraph").html(wholeString);
  
  });
}


export function getProductFromDB(name) {
  const db = getDatabase();
  let price = 0;
  alert(name + ' añadido');
  const productsReference = ref(db, 'products/' + name);
  onValue(productsReference, (snapshot) => {
    price = snapshot.val().price;
    if (snapshot.val().discount != null) {
      price = +((price - (price * snapshot.val().discount)).toFixed(2));
    }
  });
  return price;
}


export function addProductToDB(product, id) {
  const db = getDatabase();
  let current_cart = null;
  let price = getProductFromDB(product);
  const currentDB = ref(getDatabase());

  get(child(currentDB, `users/${id}/current_cart`)).then((snapshot) => {
    console.log(snapshot.val())
    current_cart = snapshot.val()
    current_cart.push({
      "price": price,
      "product": product
    })
    console.log(current_cart)
    const updates = {};
    updates['users/' + id + '/current_cart'] = current_cart;
    update(ref(db), updates)
  }).catch((error) => {
    const newCurrentCart = push(child(ref(db), 'users/${id}/'),'current_cart');
    const updates = {};
    let current_cart = [];
    current_cart.push({
      "price": price,
      "product": product
    })
    updates['users/' + id + '/current_cart'] = current_cart;
    update(ref(db), updates);
  
  });
  
}