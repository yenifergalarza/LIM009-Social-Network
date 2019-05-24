import { deleteComments, editComments } from '../lib/view-controllers/posts-actions.js';

export const listComments = (comment) => {
  const div = document.createElement('div')
  const divComment = `
      <div class="replyWhite pxy-5 px-15">
          <h3 class="font-size-post">${comment.doc.user} : </h3>   
          <span class="font-size-post" id="comment-msg">${comment.doc.post}</span>
          <input type="text" id="update-comment" class="hide mgx">
          <button class="cross click button-icon-comment" id="delete-comment-post"></button>
          <button class="mgx button-pencil click button-icon-comment" id="edit-comment-post"></button>
      </div>
    
    `
  div.innerHTML = divComment
  const deleteCommentPost = div.querySelector('#delete-comment-post')
  const editCommentPost = div.querySelector('#edit-comment-post')

  deleteCommentPost.addEventListener('click', () =>
    deleteComments(comment))

  editCommentPost.addEventListener('click', () => {
    const commentMsg = div.querySelector('#comment-msg');
    const updateComment = div.querySelector("#update-comment");
    updateComment.classList.toggle('hide');
    if (updateComment.value !== "") {
      editComments(comment, updateComment.value);
    };
    commentMsg.classList.toggle('hide');
  })
  return div
}