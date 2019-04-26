import {registerAfterTemplate} from '../main.js'

export const leaveSesion = () => {
  const string = `
    <p>Welcome </p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `;
  const div = document.createElement('div')
  div.innerHTML = string;
  const content = document.getElementById('content')
  content.appendChild(div);
}


export const withPhoto = (user) => {
  const userPhoto = `<img src=${user.photoURL}>`;
  document.write('Hello' + user.displayName + userPhoto);
  console.log(user);
};

export const withOutPhoto = (user) => {
    document.write('Hello' + user.displayName );
    console.log(user);
  };

const main = document.getElementById('main');
export const screen1 = () => {

  const back1 = `  <div class="container container-bg">
    <img src="assets/18984.jpg" alt="Some bg">
  </div>
  <div id='login' class="container px-5">

    <h2 class="title-pass">WEBOOKS</h2>
    <h4 class="px-4 subtitle-pass" >Bienvenidx!</h4>

    <div class="one-column">
      <input id="email-login" type="email" placeholder="Email" class="input-text" />
      <input id="password-login" type="password" placeholder="Password" class="input-text" />
      <button type="button" id="button-login-email" class="button-pass"> Log in </button>
    </div>

    <p class="fs-20 px-15">O bien ingresa con...</p>

    <a class="devicon-google-plain gmail-color icon-size"id="google-login"></a>
    <a class="devicon-facebook-plain facebook-color icon-size" id="fb-login"></a>
    <div class="fs-20 px-0 "> ¿No tienes una cuenta? <a id="showRegister">Registrate</a> </div> 

  </div>
`;
  main.innerHTML = back1;

  const screenRegister = () => {
    const login = document.getElementById('login')
    login.innerHTML = '';
    const register =
      `<div id="register" class="container px-5 non'e">
<h4 class="px-4 subtitle-pass" >Registro de usuario </h4>
<div class="one-column">
  <input id="email-signin" type="email" placeholder="Email" class="input-text" />
  <input id="password-signin" type="password" placeholder="Password" class="input-text" />
  <button type="button" id="button-register" class="button-pass"> Registrarme </button>
</div>
</div>
`;
    const div = document.createElement('div')
    div.innerHTML = register;
    login.appendChild(div);
  };

  const registerA = document.querySelector('[id="showRegister"]');
    registerA.addEventListener('click', e => {
      e.preventDefault();
      screenRegister();
      //POR VERIFICAR 
      registerAfterTemplate()
    })
};