import { funcRegister, funcLogin, funcGoogle, funcFacebook, activeUser, signOut } from '../controller-firebase/auth.js';

const changeHash = (hash) => {
  location.hash = hash;
}

// activeUser();
const getActiveUser = (user) => {
  if (user) {
    console.log("existe usuario acctivo")
console.log(user)
  } else {
    console.log("no existe usuario activo")
  }
}

export const active = () => {
  activeUser(getActiveUser)
}

export const signOutUser = () => {
  signOut();
  changeHash('#')
}

const ShowErrorMessaggeDom = (error) => {
  const pError = document.getElementsByTagName('p')[0];
  pError.innerHTML = ` `;
  pError.innerHTML = `${error.message}`;
}

export const login = () => {
  // event.preventDefault();
  const emailLogInEmail = document.querySelector('#email-login')
  const passwordLogInEmail = document.querySelector('#password-login');
  funcLogin(emailLogInEmail.value, passwordLogInEmail.value)
    .then(result => {
      changeHash('#/content')
      // Content(result);
    })
    .catch(error => ShowErrorMessaggeDom(error));

}

export const googleLogin = () => {
  funcGoogle()
    .then(result => {
      changeHash('#/content')
      // Content(result);
    })
    .catch(error => ShowErrorMessaggeDom(error))
}

export const facebookLogin = () => {
  funcFacebook()
    .then(result => {
      changeHash('#/content')
      // Content(result);
    })
    .catch(error => ShowErrorMessaggeDom(error))
}

export const register = () => {
  const emailSignIn = document.getElementById('email-signin');
  const passwordSignIn = document.getElementById('password-signin');

  funcRegister(emailSignIn.value, passwordSignIn.value)
    .then(result => {
      changeHash('#/content')
      // Content(result);
    })
    .catch(error => ShowErrorMessaggeDom(error))
}

