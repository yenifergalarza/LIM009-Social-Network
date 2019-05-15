import { signOutUser } from '../lib/view-controllers/auth.js';
import { addNewPost, getUser, deletePosts } from '../lib/view-controllers/firestore.js';

const listPosts = (publi) => {
  console.log(publi)
  const div = document.createElement('div')
  const publicacion = `
        <div>Publicado por <span>${publi.doc.user}</span>
        </div>
        <br>
        <div>${publi.doc.post}</div>
        <br>
        <div> likes: ${publi.doc.likes} <span id="like"></span></div>
        <br>
        <button id="delete"> Eliminar </button>
        <br>
        <button id="edit"> Editar </button>
        <br>
          `
  div.innerHTML = publicacion;
  
  const btnDelete = div.querySelector('#delete');
  btnDelete.addEventListener('click', () => deletePosts(publi))

  const btnEdit = div.querySelector('#delete');
  btnEdit.addEventListener('click', () => deletePosts(publi))

  return div
}

export const Content = (posts) => {
  const div = document.createElement('div');
  div.innerHTML = `
        <div id="printinfo"> </div>
        <button id="btn-out">Cerrar sesión</button>
        <br><br>

        <input id="comment" type="text" id="inputText"/>
        <button id="add">Añadir</button>
        <div id="postAdded"></div>
        `;
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#printinfo');
  const comment = div.querySelector('#comment');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#postAdded');

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
