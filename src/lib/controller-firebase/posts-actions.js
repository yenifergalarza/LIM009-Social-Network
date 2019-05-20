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


export const addComment = (input, userName, uid, postFatherId) => {
  const firestore = firebase.firestore();
  return firestore.collection('posts').doc(postFatherId).collection('comments').add({
    post: input,
    user: userName,
    uid: uid
  })
}

