export const updateUser = (user, newName) => {
    const firestore = firebase.firestore();
    return firestore.doc(`users/${user.uid}`).update({
        name: newName
    });
}