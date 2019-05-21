import { funcRegister, funcLogin, funcGoogle, funcFacebook, signOut } from '../controller-firebase/auth.js';
import { getUserData } from '../controller-firebase/posts.js'

const changeHash = (hash) => {
  location.hash = hash;
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
      getUserData(result.user)
    })
    .catch(error => ShowErrorMessaggeDom(error));

}

export const googleLogin = () => {
  funcGoogle()
    .then(result => {
      changeHash('#/content')
      getUserData(result.user)
    })
    .catch(error => ShowErrorMessaggeDom(error))
}

export const facebookLogin = () => {
  funcFacebook()
    .then(result => {
      changeHash('#/content');
      console.log(result.user)
      getUserData(result.user)
    })
    .catch(error => ShowErrorMessaggeDom(error))
}

export const register = (input) => {
  const emailSignIn = document.getElementById('email-signin');
  const passwordSignIn = document.getElementById('password-signin');

  funcRegister(emailSignIn.value, passwordSignIn.value)
    .then(result => {
      changeHash('#/content');
      getUserData(result.user, input.value)
    })
    .catch(error => ShowErrorMessaggeDom(error))
}