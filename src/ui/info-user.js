import { signOutUser } from '../lib/view-controllers/auth.js';
import { addNewPost, getUser, deletePosts, editPosts } from '../lib/view-controllers/firestore.js';

const listPosts = (publi) => {
  console.log(publi)
  const div = document.createElement('div')
  const publicacion = `
    <div class="comment-post post">
      <div class="owner-post">
        <h3 class="font-size-post white ">Publicado por <span>${publi.doc.user}</span> </h3>
        <div class="cross" id="delete"></div>
      </div>
      <div class="font-size-post text-post"> ${publi.doc.post}</div>
      <input id="update-data" value=${publi.doc.post} />
      <button id="edit"> Editar </button>
       <div class="color-post">
        <div class="container-click reaction">
          <div type="button" id="like" class="button-like click button-icon"> ${publi.doc.likes} </div>
          <div id="edit" class=" button-paperPlane click button-icon"></div>
        </div>
      </div>
    </div>
  `
  div.innerHTML = publicacion;
  const btnDelete = div.querySelector('#delete');
  btnDelete.addEventListener('click', () => deletePosts(publi))

  const btnEdit = div.querySelector('#edit');
  const updateData = div.querySelector('#update-data')
  btnEdit.addEventListener('click', () => editPosts(publi, updateData.value))

  return div
}

export const Content = (posts) => { 
  const div = document.createElement('div');
  div.innerHTML = `
  <nav class="nav">
    <div class="nav-content">
      <div id="show-menu" class="menu"></div>
      <h1 class="white">Welcome </h1>
    </div>
  </nav>

  <div class="container">
    <div class="container-user">
      <div class="user-image-landscape">
      </div>

      <div class="user-photo-name">
        <img class="user-photo" src="../controller-firebase/PIRATAS.jpg" alt="">
        <div class="text-user" id="print-info"></div>
        <button id="btn-out">Cerrar sesión</button>
      </div>
      
    </div>
  </div>

  <div class="posts">
    <div class="edit-post post ">
      <textarea name="" id="comment" cols="30" rows="10" class="write-post "></textarea>
      <div class="container-click">
        <div type="button" id="add-image" class="button-photo click button-icon"> </div>
        <button id="add" class="button-share click white"> Publicar </button>
      </div>
    </div>
    <div id="post-added"></div>
  </div>
  `;
  
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#print-info');
  const comment = div.querySelector('#comment'); 
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#post-added');

  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
          <p> Name: ${myData.name}</p>
          <img src= ${myData.photo} alt="user image">
          `
  });

  add.addEventListener('click', () => {
    addNewPost(comment)
  });

  posts.forEach(publi => {
    postAdded.appendChild(listPosts(publi))
  })
  
  return div
};
