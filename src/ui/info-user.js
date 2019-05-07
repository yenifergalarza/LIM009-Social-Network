import { signOutUser } from '../lib/view-controllers/auth.js';
// import { main } from './login.js';

export const Content = () => {
  const div = document.createElement('div');
  const string = `
        <p>Welcome </p>
        <button id="btn-out">Cerrar sesi?n</button>
        `;

  div.innerHTML = string;
    const buttonLogOut = div.querySelector('#btn-out');
    buttonLogOut.addEventListener('click', signOutUser)

  return div
};
