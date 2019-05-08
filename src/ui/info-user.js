import { signOutUser } from '../lib/view-controllers/auth.js';
import { activeUser, currentUser } from '../lib/controller-firebase/auth.js'
import { getRealTimeData } from '../lib/controller-firebase/firestore.js'
// import { main } from './login.js';

export const Content = () => {
  const div = document.createElement('div');
  activeUser(user => {
    if (currentUser()) {
      const photoURL = user.photoURL;
      const name = user.displayName;
      const email = user.email;
      const uid = currentUser.uid;  
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      div.innerHTML = `
        <p>Welcome ${name} </p>
        <img src=${photoURL}>
        <div id="printinfo"> </div>
        <button id="btn-out">Cerrar sesión en ${email}</button>
        `;
      const buttonLogOut = div.querySelector('#btn-out');
      buttonLogOut.addEventListener('click', signOutUser)
      const printinfo = div.querySelector('#printinfo');
      // setTimeout(() => {
        
        getRealTimeData(printinfo)
      // }, 1500);

    }
  });
  return div
};
