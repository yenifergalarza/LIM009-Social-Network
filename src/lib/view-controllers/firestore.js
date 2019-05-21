import { getRealTimeData, addPost, deletePost, editPost, getImagePost } from '../controller-firebase/posts.js'
import { likePlus, privacyPost, addComment, deleteComment, editComment } from '../controller-firebase/posts-actions.js'
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
  getUser(user=> {
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

export const editPrivacy = (publi, privacy) => {
  if (currentUser().uid === publi.doc.uid) {
    privacyPost(publi.id, privacy)
  }
}

export const toggleLikes = (publi, like) => {
  likePlus(publi.id, like)
}

export const updateUserDataName = (user, data) => {
  updateUser(user, data)
}

export const addingPhotos = (photo) => {
  addPhoto(photo)
}

export const addNewComment = (input, id) => {
getUser(user=> {
  addComment(input.value, user.name, user.uid, id)
    .then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
})
}

export const deleteComments = (comment) => {
  if (currentUser().uid === comment.doc.uid) {
    deleteComment(comment)
  }
}

export const editComments = (comment, input) => {
  console.log(comment)
  if (currentUser().uid === comment.doc.uid) {
    editComment(comment, input)
  }
}