import { register } from '../lib/view-controllers/auth.js'

export const Register = () => {
  const string =
    `
    <div class="container1 container-bg">
      <img  class="someBg" src="assets/18984.jpg" alt="Some bg">
    </div>

    <div id="register" class="container1 px-5">
      
      <h4 class="px-4 subtitle-pass" >Registro de usuario </h4>
      <div class="one-column">
        <input id="name-signin" type="text" placeholder="Nombre y apellido" class="input-text" />
        <input id="email-signin" type="email" placeholder="Email" class="input-text" />
        <input id="password-signin" type="password" placeholder="Password" class="input-text" />
        <p class="error-message"></p>
        <button type="button" id="button-register" class="button-pass"> Registrarme </button>
      </div>
      <div class="fs-20 px-0">¿Ya estás registrado? <a href="#" id="back-login">Ingresa aquí</a> </div>
    </div>
  `;
  const div = document.createElement('div')
  div.className = 'fluid-flex';
  div.innerHTML = string;

  const nameSignin = div.querySelector('#name-signin');
  const buttonRegisterEmail = div.querySelector('#button-register');
  buttonRegisterEmail.addEventListener('click', ()=> register(nameSignin))
  
  return div
};
