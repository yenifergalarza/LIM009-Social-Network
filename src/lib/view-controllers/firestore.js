import { getRealTimeData, addPost, deletePost, editPost,addPhoto } from '../controller-firebase/posts.js'
import { likePlus, privacyPost } from '../controller-firebase/posts-actions.js'
import { updateUser } from '../controller-firebase/user-profie.js'

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
  addPost(input, user.displayName, user.uid, 0, privacy)
  .then(ref => {
    console.log('Added document with ID: ', ref.id);
  });
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

export const editPrivacy = (publi, privacy) => {
  if (currentUser().uid === publi.doc.uid) {
    privacyPost(publi.id, privacy)
  }
}

export const addingLikes = (publi, like) => {
  likePlus(publi.id, like)
}

export const updateUserDataName = (user, data) => {
  updateUser(user, data)
}

export const addingPhotos = (photo) => {
  addPhoto(photo)
}