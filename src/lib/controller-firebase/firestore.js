export const getUserData = (user) => {
  const firestore = firebase.firestore();
  firestore.doc(`users/info`).set({
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
  firestore.doc(`users/info`).onSnapshot(cb)
}

export const addPost = (input, user, like, privacyState) => {
  const firestore = firebase.firestore();
  const addDoc = firestore.collection('posts')
  addDoc.add({
    post: input.value,
    user: user.displayName,
    uid: user.uid,
    likes: like,
    privacy: privacyState,
    state: true,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
    .then(ref => {
      console.log('Added document with ID: ', ref.id);
    })

}

export const getRealTimePost = (cb) => {
  const firestore = firebase.firestore();
  const queryPost = firestore.collection('posts');
  queryPost.onSnapshot(snapshot => {
    const posts = []
    snapshot.forEach(doc => {
      posts.push({ id: doc.id, doc: doc.data() });
    })

    cb(posts)
  })
}

export const deletePost = (id) => {
  const firestore = firebase.firestore();
  firestore.collection('posts').doc(id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })

}

export const editPost = () => {
  const firestore = firebase.firestore();
  firestore.collection('posts').doc(id).update()
}