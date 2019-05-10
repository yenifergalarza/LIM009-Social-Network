import { signOutUser } from '../lib/view-controllers/auth.js';
import { currentUser } from '../lib/controller-firebase/auth.js'
import { getRealTimePost } from '../lib/controller-firebase/firestore.js'
import { addNewPost, getUser } from '../lib/view-controllers/firestore.js'

export const Content = () => {
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

  const user = currentUser()
  add.addEventListener('click', () => {
    addNewPost(user)
  });
  getRealTimePost((posts) => {
    posts.forEach(publi => {
      console.log(publi)
      const div = document.createElement('div')
      const publicacion = `
        <div>Publicado por <span>${publi.user}</span>
        </div>
        <br>
        <div>${publi.post}</div>
        <br>
        <div> likes: ${publi.likes} <span id="like"></span></div>
        <br>
        <br>
          `
      div.innerHTML = publicacion
      return div
    })
  });
  return div
};
