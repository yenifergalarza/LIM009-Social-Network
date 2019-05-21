import { toggleLikes, editPrivacy, addNewComment} from '../lib/view-controllers/posts-actions.js';
import { deletePosts, editPosts } from '../lib/view-controllers/posts.js';
import { getRealTimeComment } from '../lib/controller-firebase/posts-actions.js'
import { currentUser } from '../lib/controller-firebase/auth.js';
import { listComments } from './posts-comments.js'

export const listPosts = (publi) => {
  const div = document.createElement('div')
  const posts = `
      <div class="comment-post post">
        
        <div class="owner-post">
          <h3 class="font-size-post white ">Publicado por ${publi.doc.user} </h3>
            <select name="privacy" id="edit-privacy" class="hide ml-39"> 
              <option value=${publi.doc.privacy}></option>
              <option></option>
            </select>
            <div class="cross" id="delete"></div>
        </div>
        <div>
          <div class="font-size-post px-6" id="post-message"> ${publi.doc.post}</div>
          <input id="update-data" class="hide mgx" value= ${publi.doc.post} />
          <div id="photoUploaded"></div>     
        </div>
        <div class="color-post">
          <div class="container-click reaction">
            <div class="displayFlex w-30"> 
              <button type="button" id="button-like" class=" click button-icon button-like "></button>
              <p>${publi.doc.likes}</p>
              <button type="button" id="button-dislike" class=" click button-icon button-dislike "></button>
              
            </div>
            <div id="edit-post" class="hide button-pencil click button-icon"></div>
            <div id="reply" class=" button-paperPlane click button-icon "></div>
          </div>
          <div id="comments" class="hide">
            <div class="container"> 
              <input id="input-comment" type="text" class="width-70 mgx" placeholder="Escribe un comentario">
              <button id="btn-comment" class="button-share-comment click white" type="button"> Comentar</button>
            </div>
            <div id="comment-post"></div>
          </div>
        </div>
      </div>
    `;
  div.innerHTML = posts;

  const reply = div.querySelector('#reply');
  const comments = div.querySelector('#comments')
  reply.addEventListener('click', () => {
    comments.classList.toggle('hide')
  })

  const inputComment = div.querySelector('#input-comment');
  const commentPosts = div.querySelector('#comment-post')
  const btnComment = div.querySelector('#btn-comment')
  btnComment.addEventListener('click', () => {
    addNewComment(inputComment, publi.id);
  })

  getRealTimeComment(publi.id, (data) => {
    commentPosts.innerHTML = ''
    data.forEach(comment => {
      return commentPosts.appendChild(listComments(comment))
    })
  })


  const postImg = div.querySelector('#photoUploaded');
  if (publi.doc.photo !== '') {
    const image = document.createElement('img')
    image.setAttribute('src', publi.doc.photo)
    image.classList.add('styleAddImage');
    postImg.appendChild(image)
  }


  const like = div.querySelector('#button-like');
  const dislike = div.querySelector('#button-dislike');

  like.addEventListener('click', () => {
    const plusLike = publi.doc.likes + 1;
    toggleLikes(publi, plusLike)
  });

  dislike.addEventListener('click', () => {
    const lessLike = publi.doc.likes - 1;
    toggleLikes(publi, lessLike)
  })

  const btnDelete = div.querySelector('#delete');
  btnDelete.addEventListener('click', () => deletePosts(publi));

  const btnEditPost = div.querySelector('#edit-post');
  btnEditPost.addEventListener('click', () => {
    const textEdit = div.querySelector('#post-message');
    const updateData = div.querySelector("#update-data");
    updateData.classList.toggle('hide');
    if (updateData.value !== "") {
      editPosts(publi, updateData.value);
    };
    textEdit.classList.toggle('hide');
  });

  const privacy = div.querySelector('#edit-privacy');

  if (privacy.options[0].value === 'public') {
    privacy.options[0].innerHTML = 'Público'
    privacy.options[1].setAttribute('value', 'private')
    privacy.options[1].innerHTML = 'Solo yo'
  } else if (privacy.options[0].value === 'private') {
    privacy.options[0].innerHTML = 'Solo yo'
    privacy.options[1].setAttribute('value', 'public');
    privacy.options[1].innerHTML = 'Público'
  }
  if (publi.doc.uid == currentUser().uid) {
    btnEditPost.classList.remove('hide')
    privacy.classList.remove('hide')
  }
  privacy.addEventListener('click', () => editPrivacy(publi, privacy.value))

  return div
}