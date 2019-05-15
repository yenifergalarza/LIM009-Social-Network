import { getRealTimeData, addPost,deletePost } from '../controller-firebase/firestore.js'
import { currentUser } from '../controller-firebase/auth.js';

export const getUser = (cb) => {
  getRealTimeData((doc) => {
    if (doc && doc.exists) {
      const myData = doc.data();
      cb(myData)
    }
  });
}

export const addNewPost = (input) => {
  const user = currentUser()
  addPost(input, user, 0, 'public');
}

export const deletePosts = (publi) => {
  if (currentUser().uid === publi.doc.uid) {
    deletePost(publi.id)
  }
}