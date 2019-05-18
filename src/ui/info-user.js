import { signOutUser } from '../lib/view-controllers/auth.js';
import { addNewPost, getUser, deletePosts, editPosts ,addingLikes,updateUserDataName, editPrivacy} from '../lib/view-controllers/firestore.js';
import { currentUser } from '../lib/controller-firebase/auth.js';


const listPosts = (publi) => {
  const div = document.createElement('div')
  const publicacion = `
    <div class="comment-post post">
      <div class="owner-post">
        <h3 class="font-size-post white ">Publicado por <span>${publi.doc.user}</span> </h3>
        <div class="cross" id="delete"></div>
      </div>

      <div class="font-size-post text-post"> ${publi.doc.post}</div>
      <input id="update-data" value= ${publi.doc.post} />
      

      <div class="color-post">
        <div class="container-click reaction">
          <div type="button" id="like" class="button-like click button-icon"> ${publi.doc.likes} </div>
          <div id="edit" class=" button-paperPlane click button-icon"></div>
          <button id="edit" class=" button-like click button-icon"> Editar </button>
          </div>
          
          <select name="privacy" id="edit-privacy"> 
            <option value="public">Público </option>
            <option value="private">Solo yo</option>
          </select>
        </div>
      </div>
    </div>
  `
  div.innerHTML = publicacion;

  const like = div.querySelector('#like');
  let numberLike = 0;

  like.addEventListener('click', () => addingLikes(publi, numberLike++));

  const btnDelete = div.querySelector('#delete');
  btnDelete.addEventListener('click', () => deletePosts(publi));

  const btnEdit = div.querySelector('#edit');
  const updateData = div.querySelector('#update-data');
  btnEdit.addEventListener('click', () => editPosts(publi, updateData.value));

  const privacy = div.querySelector('#edit-privacy');
  // privacy.addEventListener('click', () => editPrivacy(publi, privacy.value))

  return div
}

export const Content = (posts) => {
  const div = document.createElement('div');
  div.innerHTML = `
  <nav class="nav">
    <div class="nav-content">
      <div id="show-menu" class="menu"></div>
      <h1 class="white">Welcome </h1>  
      <button id="btn-out">Cerrar sesión</button>
    </div>
  </nav>

  
  <div class="container">
    <div class="container-user" id="print-info"></div>
    <div class="posts">
      <div class="edit-post post ">
        <textarea name="" id="comment" cols="30" rows="10" class="write-post"></textarea>
        <div class="container-click">
          <div type="button" id="add-image" class="button-photo click button-icon"></div>
          <select name="privacy" id="select-privacy"> 
            <option value="public">Público </option>
            <option value="private">Solo yo</option>
          </select>
          <button id="add" class="button-share click white"> Publicar </button>
        </div>
      </div>
      <div id="post-added"></div>
    </div>
  </div>

  `;

  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#print-info');
  const comment = div.querySelector('#comment');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#post-added');
  const privacy = div.querySelector('#select-privacy');


  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
      <div class="user-image-landscape">
      </div>
  
      <div class="user-photo-name">
        <img class="user-photo" src="${myData.photo}" alt="">
      <div class="text-user">
      <p id="nameNeedChange"> ${myData.name}</p>
      <input id="inputName"/>
      <div class="button-like click button-icon" id="changeName"> </div>
      <p>developer jr</p>
  `;

const buttonActionChange = printinfo.querySelector('#changeName');
buttonActionChange.addEventListener('click',()=>{
  const inputNewName =  printinfo.querySelector("#inputName"); 
  updateUserDataName(myData,inputNewName.value);
})
  });

  add.addEventListener('click', () => {
    addNewPost(comment, privacy.value);
  });

  posts.forEach(publi => {
    console.log(publi)
    if (publi.doc.privacy=='public') {
      postAdded.appendChild(listPosts(publi))
    } else if (publi.doc.privacy=='private' && currentUser().uid == publi.doc.uid ) {
      postAdded.appendChild(listPosts(publi))
    }
  })
  return div
};