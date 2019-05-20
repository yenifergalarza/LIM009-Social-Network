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

export const addPost = (input, user, uid, like, privacyState, photoUrl) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').add({
    post: input,
    user: user,
    uid: uid,
    likes: like,
    privacy: privacyState,
    photo: photoUrl,
    date: new Date()
  })
}

export const getRealTimePost = (cb) => {
  const firestore = firebase.firestore();
  const publicPrivacy = firestore.collection('posts').orderBy('date', 'desc')
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

export const getImagePost = (file, cb) => {
  //create ref
  const storageRef = firebase.storage().ref()
  const imageRef = storageRef.child(`images/${file.name}`)

  //update file to fb storage
  const task = imageRef.put(file)
  return task.on('state_changed', (snapshot) => {
  }, (error) => {
  }, () => {
    //get updated img url 
    const downloadImg = task.snapshot.ref.getDownloadURL()
    downloadImg.then(cb)
  })
}

/*
UI -> event -> validate inputs -> render loader -> do stuff -> hide loader -> display new UI
*/