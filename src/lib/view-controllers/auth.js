import { funcRegister, funcLogin, funcGoogle, funcFacebook, signOut, activeUser, currentUser } from '../controller-firebase/auth.js';
import { getUserData } from '../controller-firebase/firestore.js'

const changeHash = (hash) => {
  location.hash = hash;
}

export const signOutUser = () => {
  signOut();
  changeHash('#')
}

const getUserInfo = cb => {
  if(currentUser()) {
    cb(currentUser());
  }

  const unsubscribe = () => {
    activeUser( user => {
      if(user){
        cb(user)
      } else {

      }
    });
    unsubscribe();
  }
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
      getUserData(result.user)
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

