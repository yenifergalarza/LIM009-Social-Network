import { signOut } from '../lib/controller-firebase/controller-firebase-auth.js';
import { main } from './login.js';

const logOut = user => {
  if (user) {
    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click', signOut);
  }
};

export const printInfoUser = (result) => {
  const user = result.user;
  const div = document.createElement('div')
  main.innerHTML = ''
  main.appendChild(div);
  console.log(user);
  const buttonOut = `<button id="buttonLogOut">Cerrar sesión</button>`
  if (user.photoURL) {
    div.innerHTML = `
        <p>Welcome </p>
        ${user.displayName} <img src=${user.photoURL} id="userFile">
        ${buttonOut}
        `;
  } else {
    div.innerHTML = `
    Hello ${user.email} ${buttonOut}
    `;
  }
  logOut(result);
};
