import { login, googleLogin, facebookLogin, active } from '../lib/view-controllers/auth.js'


export const Login = () => {
  const div = document.createElement('div')
  const back1 = `  
    <div class="container1 container-bg">
      <img  class="someBg" src="assets/18984.jpg" alt="Some bg">
    </div>
    <div id='login' class="container1 px-5">
  
      <h2 class="title-pass">WEBOOKS</h2>
      <h4 class="px-4 subtitle-pass" >Bienvenidx!</h4>
  
      <div class="one-column">
        <input id="email-login" type="email" placeholder="Email" class="input-text" />
        <input id="password-login" type="password" placeholder="Password" class="input-text" />
        <p class="error-message"></p>
        <button type="button" href="#/content" id="button-login-email" class="button-pass"> Log in </button>
      </div>
  
      <p class="fs-20 px-15">O bien ingresa con...</p>
  
      <a class="devicon-google-plain gmail-color icon-size"id="google-login"></a>
      <a class="devicon-facebook-plain facebook-color icon-size" id="fb-login"></a>
      <div class="fs-20 px-0 "> ¿No tienes una cuenta? 
      <a href="#/register" id="showRegister">Registrate</a> </div> 
  
    </div>
  `;
  div.className = 'fluid-flex';
  div.innerHTML = back1;

  const buttonLogInEmail = div.querySelector('#button-login-email');
  buttonLogInEmail.addEventListener('click', login);

  const gmailLogin = div.querySelector('#google-login');
  gmailLogin.addEventListener('click', googleLogin);

  const fbLogin = div.querySelector('#fb-login');
  fbLogin.addEventListener('click', facebookLogin);

  active()

  return div
};

