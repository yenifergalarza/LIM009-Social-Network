import { screen1 } from './ui/login.js'
import { initRoute } from './routes.js'
// Initialize Firebase
const initFirebase = () => {
  const config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "gs://fir-basics-c204d.appspot.com/",
    messagingSenderId: "582126712915"
  };
  firebase.initializeApp(config);
}

window.addEventListener('load', () => {
  initFirebase();
  screen1();
  initRoute();
});

