import { signOutUser } from '../lib/view-controllers/auth.js';

// import { main } from './login.js';

export const Content = () => {
  const div = document.createElement('div');
  const string = `
  <nav><p>Welcome </p> <button id="btn-out">Cerrar sesi?n</button> </nav>
  <div>
      <div>
          <img src="" alt="">
          <div>
              <p>juanita</p>
              <p>developer</p>
          </div>
      </div>
      <div>
            <input id="email-signin" type="email" placeholder="Email" class="input-text" />
            <div>
              <button type="button" id="button-register" class="button-pass"> Registrarme </button>
              <button id="imprime">imprime</button>
          
            </div>
      </div>
  </div>
        `;

  div.innerHTML = string;
    const buttonLogOut = div.querySelector('#btn-out');
    buttonLogOut.addEventListener('click', signOutUser)

  return div
};
