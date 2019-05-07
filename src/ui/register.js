import { register } from '../lib/view-controllers/auth.js'

export const Register = () => {
  const string =
    `
    <div class="container container-bg">
      <img  class="someBg" src="assets/18984.jpg" alt="Some bg">
    </div>

    <div id="register" class="container px-5">
      <h4 class="px-4 subtitle-pass" >Registro de usuario </h4>
      <div class="one-column">
        <input id="email-signin" type="email" placeholder="Email" class="input-text" />
        <input id="password-signin" type="password" placeholder="Password" class="input-text" />
        <p class="error-message"></p>
        <button type="button" id="button-register" class="button-pass"> Registrarme </button>
      </div>
      <div class="px-15">¿Ya estás registrado? <a href="#" id="back-login">Ingresa aquí</a> </div>
    </div>
  `;
  const div = document.createElement('div')
  div.className = 'fluid-flex';
  div.innerHTML = string;

    const buttonRegisterEmail = div.querySelector('#button-register');
    buttonRegisterEmail.addEventListener('click', register)
  
  return div
};
