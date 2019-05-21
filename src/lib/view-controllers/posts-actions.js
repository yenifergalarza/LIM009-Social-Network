import { likePlus, privacyPost, addComment, deleteComment, editComment } from '../controller-firebase/posts-actions.js'
import { currentUser } from '../controller-firebase/auth.js';

export const editPrivacy = (publi, privacy) => {
  if (currentUser().uid === publi.doc.uid) {
    privacyPost(publi.id, privacy)
  }
}

export const toggleLikes = (publi, like) => {
  likePlus(publi.id, like)
}


export const addNewComment = (input, id) => {
  getUser(user => {
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