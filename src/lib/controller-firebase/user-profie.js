export const updateUser = (uid, newName) => {
  const firestore = firebase.firestore();
  return firestore.doc(`users/${uid}`).update({
    name: newName
  });
}
