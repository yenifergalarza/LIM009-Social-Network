export const getUserData = (user) => {
    const firestore = firebase.firestore();
    const usersDoc = firestore.doc(`users/info`)
    usersDoc.set({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      uid: user.uid
  
    }).then((doc) => {
      const mydata = doc.data();
      cb(mydata);
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
  
  export const addPost = (cb) => {
    const firestore = firebase.firestore();
    const addDoc = firestore.collection('posts')
    addDoc.add(cb)
    .then(ref => {
      console.log('Added document with ID: ', ref.id);
    })
  
  }
  
  export const getRealTimePost = (cb) => {
    const firestore = firebase.firestore();
    const queryPost = firestore.collection('posts').where('state', '==', true);
    queryPost.onSnapshot(snapshot => {
      const posts = []
      snapshot.forEach(doc => {
        posts.push(doc.data());
      })
      
      cb(posts)
    })
  }