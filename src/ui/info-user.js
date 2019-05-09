import { signOutUser } from '../lib/view-controllers/auth.js';
import { activeUser, currentUser } from '../lib/controller-firebase/auth.js'
import { getRealTimeData } from '../lib/controller-firebase/firestore.js'

export const Content = () => {
  const div = document.createElement('div');
  activeUser(() => {
    if (currentUser()) {
      div.innerHTML = `
        <div id="printinfo"> </div>
        <button id="btn-out">Cerrar sesión</button>
        `;
      const buttonLogOut = div.querySelector('#btn-out');
      buttonLogOut.addEventListener('click', signOutUser)
      const printinfo = div.querySelector('#printinfo');

      getRealTimeData((doc) => {
        if (doc && doc.exists) {
          const myData = doc.data();
          console.log('check this document', doc);
          printinfo.innerHTML = `
          <p> Name: ${myData.name}</p>
          <img src= ${myData.photo} alt="user image">
          `
        }
      })

    }
  });
  return div
};
