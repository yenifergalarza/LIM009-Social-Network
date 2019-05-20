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
    uid: uid,
    date: new Date()
  })
  
}

export const getRealTimeComment = (postFatherId, cb)=> {
  const firestore =  firebase.firestore();
  const allComments = firestore.collection('posts').doc(postFatherId).collection('comments').orderBy('date', 'desc')
  allComments.onSnapshot(snapshot => {
    const comment = [];
    snapshot.forEach(doc=> {
      comment.push({id: doc.id, doc: doc.data()})
    })
    cb(comment)
  })
}
