import { signOutUser } from '../lib/view-controllers/auth.js';
import { activeUser, currentUser } from '../lib/controller-firebase/auth.js'
import { getRealTimeData, addPost, getRealTimePost } from '../lib/controller-firebase/firestore.js'

export const Content = () => {
  const div = document.createElement('div');

  activeUser(() => {
    if (currentUser()) {
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
      getRealTimeData((doc) => {
        if (doc && doc.exists) {
          const myData = doc.data();
          console.log('check this document', doc);
          printinfo.innerHTML = `
          <p> Name: ${myData.name}</p>
          <img src= ${myData.photo} alt="user image">
          `
        }
      });

      add.addEventListener('click', () => {
        addPost({
          post: comment.value,
          valor: 10
        });
        getRealTimePost(publi => {
          const posts = []
          publi.forEach(doc => {
            posts.push(doc.data().post);
            // console.log(posts)
            // const myData = doc.data();
            postAdded.innerHTML = `
            ${posts}
            `
          });
      });
      });
    }
  });
  return div
};
