import { getRealTimeData, addPost, deletePost, editPost, getImagePost } from '../controller-firebase/posts.js'
import { currentUser } from '../controller-firebase/auth.js';

export const getUser = (cb) => {
  getRealTimeData(currentUser().uid, (doc) => {
    if (doc && doc.exists) {
      const myData = doc.data();
      cb(myData)
    }
  });
}


let newimg = ''
export const getImage = (file) => {
  getImagePost(file[0], downloadURL => {
    console.log('available at', downloadURL);
    if (file.length !== 0) {
      newimg = downloadURL
    }
  })
}

export const addNewPost = (input, privacy, file) => {
  let photoImg = ''
  if (file !== 0) {
    photoImg = newimg
  };
  getUser(user => {
    addPost(input, user.name, user.uid, 0, privacy, photoImg)
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
      });
  })
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
