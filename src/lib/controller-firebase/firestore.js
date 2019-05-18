export const getUserData = (user) => {
  const firestore = firebase.firestore();
  return firestore.doc(`users/${user.uid}`).set({
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    uid: user.uid
  });
}

export const getRealTimeData = (uid, cb) => {
  const firestore = firebase.firestore();
  return firestore.collection('users').doc(uid).onSnapshot(cb)
}

export const addPost = (input, user, uid, like, privacyState) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').add({
    post: input,
    user: user,
    uid: uid,
    likes: like,
    privacy: privacyState,
    state: true,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const getRealTimePost = (cb) => {
  const firestore = firebase.firestore();
  const publicPrivacy = firestore.collection('posts')
  publicPrivacy.onSnapshot(snapshot => {
    const posts = []
    snapshot.forEach(doc => {
      const data = doc.data()
      posts.push({ id: doc.id, doc: data });
    })
    cb(posts)
  })
}

export const deletePost = (id) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').doc(id).delete()
}

export const editPost = (id, input) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').doc(id).update({
    post: input
  });
}

export const privacyPost = (id, privacyState) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').doc(id).update({
    privacy: privacyState
  })
}

export const likePlus = (id, like) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').doc(id).update({
    likes: like
  })
}

export const updateUser = (user, newName) => {
  const firestore = firebase.firestore();
  return firestore.doc(`users/${user.uid}`).update({
    name: newName
  });
}

/*
UI -> event -> validate inputs -> render loader -> do stuff -> hide loader -> display new UI
*/