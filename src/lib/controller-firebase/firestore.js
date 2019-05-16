export const getUserData = (user) => {
  const firestore = firebase.firestore();
  firestore.doc(`users/${user.uid}`).set({
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

export const getRealTimeData = (uid, cb) => {
  const firestore = firebase.firestore();
  firestore.collection('users').doc(uid).onSnapshot(cb)
}

export const addPost = (input, user, like, privacyState) => {
  const firestore = firebase.firestore();
  firestore.collection('posts').add({
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
  firestore.collection('posts').onSnapshot(snapshot => {
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

export const editPost = (id, input) => {
  const firestore = firebase.firestore();
  firestore.collection('posts').doc(id).update({
    post: input
  }).then(() => {
    console.log('updated!')
  }).catch(() => {
    console.log('wrong!')
  })

}


export const likePlus = (id, like) => {
  const firestore = firebase.firestore();
  firestore.collection('posts').doc(id).update({
    likes: like
  }).then(() => {
    console.log('liked!')
  }).catch(() => {
    console.log('not liked!')
  })
}