export const getUserData = (user) => {
  const firestore = firebase.firestore();
  const usersDoc = firestore.doc(`users/info`)
  usersDoc.set({
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    uid: user.uid

  }).then(() => {
    console.log('Status saved')
  }).catch((error) => {
    console.log(error)
  })
}

export const getRealTimeData = (cb) => {
  const firestore = firebase.firestore();
  const usersDoc = firestore.doc(`users/info`)
  usersDoc.onSnapshot(cb)
}