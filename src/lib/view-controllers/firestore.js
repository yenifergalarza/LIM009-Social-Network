import { getRealTimeData, addPost, deletePost, editPost ,likePlus,updateUser} from '../controller-firebase/firestore.js'
import { currentUser } from '../controller-firebase/auth.js';

export const getUser = (cb) => {
  getRealTimeData(currentUser().uid, (doc) => {
    if (doc && doc.exists) {
      const myData = doc.data();
      cb(myData)
    }
  });
}

export const addNewPost = (input, privacy) => {
  const user = currentUser()
  addPost(input, user, 0, privacy);
}


export const deletePosts = (publi) => {
  if (currentUser().uid === publi.doc.uid) {
    deletePost(publi.id)
  }
}

export const editPosts = (publi, input) => {
  if (currentUser().uid === publi.doc.uid) {
    editPost(publi.id, input)
  }
}

  export const addingLikes = (publi,like)=>{
      likePlus(publi.id, like)
    }



  export const updateUserDataName = (user,data)=>{
    updateUser(user,data)
  }
