
export const funcLogin = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);

// const verify = () => firebase.auth().currentUsersendEmailVerification()

export const funcRegister = (emailSignIn, passwordSignIn) => firebase.auth().createUserWithEmailAndPassword(emailSignIn, passwordSignIn)

export const funcGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider)
};

export const funcFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase.auth().signInWithPopup(provider)
}

export const signOut = () => firebase.auth().signOut();

export const activeUser = (cb) => firebase.auth().onAuthStateChanged(cb)

export const currentUser = () => firebase.auth().currentUser