var config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    projectId: "fir-basics-c204d",
    databaseURL: "https://fir-basics-c204d.firebaseio.com/datos",
    storageBucket: "gs://fir-basics-c204d.appspot.com/"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var firestore = firebase.firestore();

const docRef = firestore.doc("/datos/hk0ufzAKBKGUXiWFUM3I");



const inputEmail = document.querySelector("#email-signin");
const buttonRegister = document.querySelector("#button-register");
const imprime = document.getElementById("imprime")
buttonRegister.addEventListener("click",function(){
    const valueEmail = inputEmail.value;
    docRef.set({
       users:valueEmail
    }).then(function(){
        console.log("email saved");
    }).catch(function(error){
        console.log("got an error");
        
    });
});

imprime.addEventListener("click",function(){
    docRef.get().then(function(doc){
        if(doc&&doc.exists){
            const myData = doc.data();
            console.log(`${myData.email}`);
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