
export const getUserData = (user) => {
  const firestore = firebase.firestore();
  const usersDoc = firestore.doc(`users/info`)
  usersDoc.set({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL
  }).then(() => {
    console.log('Status saved')
  }).catch((error) => {
    console.log(error)
  })
}

export const getRealTimeData = (element) => {
  const firestore = firebase.firestore();
  const usersDoc = firestore.doc(`users/info`)
  usersDoc.onSnapshot((doc) => {
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log('check this document', doc);
      element.innerHTML = `
      <p>
      Status: ${myData.name}
      </p>
      `
    }
  })
}