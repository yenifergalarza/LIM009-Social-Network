import { signOutUser } from '../lib/view-controllers/auth.js';
import { addNewPost, getUser, deletePosts, editPosts, toggleLikes, updateUserDataName, getImage, editPrivacy,
  addNewComment, deleteComments, editComments } from '../lib/view-controllers/firestore.js';
import { currentUser } from '../lib/controller-firebase/auth.js';
import { getRealTimeComment } from '../lib/controller-firebase/posts-actions.js'

const listComments = (comment) =>{
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

  editCommentPost.addEventListener('click', () =>{
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

const listPosts = (publi) => {
  const div = document.createElement('div')
  const publicacion = `
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
  `
  div.innerHTML = publicacion;

  const reply = div.querySelector('#reply');
  const comments = div.querySelector('#comments')
  reply.addEventListener('click', () => {
    comments.classList.toggle('hide')
  })

  const inputComment = div.querySelector('#input-comment');
  const commentPosts = div.querySelector('#comment-post')
  const btnComment = div.querySelector('#btn-comment')
  btnComment.addEventListener('click', ()=>{
    addNewComment(inputComment, publi.id);
  })

  getRealTimeComment(publi.id, (data) => {
    commentPosts.innerHTML = ''
    data.forEach( comment => {
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

export const Content = (posts) => {
  const div = document.createElement('div');
  div.innerHTML = `
  <nav>
  <ul class="nav offUl">
    <li class="nav-content firstLi">
      <div id="show-menu" class="menu"></div>
      <h1 class="white nav-title">WeBooks </h1>
      <div class="displayFlex hideSmall dontHide">
        <button id="btn-out" class="click button-icon button-leave"></button>
        <label for="btn-out" class="white">Cerrar sesión</label>
      </div>  
      
      <ul class="navLiUl offUl" id="show-this">
        <li class="relative hideLgOut">
          <a href="" class="blackBack hoverA"> 
            <div class="displayFlex">
              <button id="btn-out" class="click button-icon button-leave"></button>
              <span class="white"> Cerrar sesión </span>
            </div>  
          </a>
        </li>
        <li class="relative">
          <a href="https://yenifergalarza.github.io/LIM009-Social-Network/"class="blackBack white  hoverA" href="">
            <div class="displayFlex">
              <button  class="click button-icon button-bulb"></button>
              <span class="white"> InfoSobreProyecto</span>
            </div>
          </a>
        </li>
      
      </ul>
    </li>
    </ul>
  </nav>

  
  <div class="container">
    <div class="container-user" id="print-info"></div>
    <div class="posts">
      <div class="edit-post post ">
        <textarea name="" id="text-post" cols="30" rows="10" class="write-post"></textarea>
        <div class="container-click">
        <input type="file" accept="image/*"  id="image-file" class="hide">
        <label class="button-photo click button-icon" for="image-file"> </label>
          <select name="privacy" id="select-privacy"> 
            <option value="public">Público</option>
            <option value="private">Solo yo</option>
          </select>
          <button id="add" class="button-share click white"> Publicar </button>
        </div>
      </div>
      <div id="post-added"></div>
    </div>
  </div>

  `;
  const showMenu = div.querySelector('#show-menu');
  const showThis = div.querySelector('#show-this')
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#print-info');
  const textPost = div.querySelector('#text-post');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#post-added');
  const privacy = div.querySelector('#select-privacy');
  const imageFile = div.querySelector('#image-file')

  showMenu.addEventListener('click', () => {
    showThis.classList.toggle('seekAndHide')
  });

  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
      <div class="user-image-landscape">
      </div>
  
      <div class="user-photo-name">
        <img class="user-photo" src="${myData.photo}" alt="">
      <div class="text-user">
      <p id="nameNeedChange" class="nameTitle"> ${myData.name}</p>
      <input id="inputName" class="hide"/>
      <p>WeBooker</p>
      <div class="button-pencil click button-icon" class="hide" id="changeName"> </div>   
  `;

    const buttonActionChange = printinfo.querySelector('#changeName');
    buttonActionChange.addEventListener('click', () => {
      const nameNeedChange = printinfo.querySelector('#nameNeedChange')
      const inputNewName = printinfo.querySelector("#inputName");
      inputNewName.classList.toggle('hide');
      if (inputNewName.value !== "") {
        updateUserDataName(myData, inputNewName.value);
      };
      nameNeedChange.classList.toggle('hide');
    })
  });
  add.addEventListener('click', () => {
    const file = imageFile.files.length
    addNewPost(textPost.value, privacy.value, file)
  });

  imageFile.addEventListener('change', (event) => {
    const file = event.target.files;
    getImage(file)
  })
  // const postId = posts.find(post =>{
  //   return post.doc.id == currentUser.uid
  // })
  // console.log(postId)
  posts.forEach(publi => {
    console.log(publi)
    if (publi.doc.privacy == 'public') {
      postAdded.appendChild(listPosts(publi))
    } else if (publi.doc.privacy == 'private' && currentUser().uid == publi.doc.uid) {
      postAdded.appendChild(listPosts(publi))
    }
  })
  return div
};