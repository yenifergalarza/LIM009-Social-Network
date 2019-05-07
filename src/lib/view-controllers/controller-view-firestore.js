var config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com/datos",
    storageBucket: "gs://fir-basics-c204d.appspot.com/"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var firestore = firebase.firestore();

  const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const docRef = firestore.doc("datos/users");



const inputEmail = document.querySelector("#email-signin");
const buttonRegister = document.querySelector("#button-register");
const imprime = document.getElementById("imprime")
buttonRegister.addEventListener("click",function(){
    const valueEmail = inputEmail.value;
    docRef.set({
        email:valueEmail
    }).then(function(){
        console.log("email saved");
    }).catch(function(error){
        console.log("got an error");
        
    });
});

imprime.addEventListener("click",function(){
    docRef.ref().then(function(doc){
        if(doc&&doc.exists){
            const myData = doc.data();
            console.log(`${myData}`);
        }
    }).catch(function(error){
        console.log("got an error",error);
    });
});
getRealtimeUpdates = function(){
    docRef.onSnapshot(function(doc){
        if(doc&&doc.exists){
            const myData = doc.data();
            console.log(`${myData}`);
        }
    });
}
getRealtimeUpdates();