import { signOutUser } from '../lib/view-controllers/auth.js';
import { currentUser } from '../lib/controller-firebase/auth.js'
import { getRealTimePost } from '../lib/controller-firebase/firestore.js'
import { addNewPost, getUser } from '../lib/view-controllers/firestore.js'

export const Content = () => {
  const div = document.createElement('div');
  div.innerHTML = `

  <nav class="nav"> 
    <div class="nav-content">
    <div id="btn-out" class="menu"></div>
    <h1 class="white">Welcome </h1>
    </div>
    </nav>

    
  <div id="printinfo" class="container-user">
 
  </div>



  <div class="posts">
    
  <div class="edit-post post ">
  <textarea name="" id="comment" cols="30" rows="10" class="write-post "></textarea>
  <div class="container-click">
  <div type="button" id="add-image" class="button-photo click button-icon"> </div>
  <div id="add" class="button-share click white">comparte</div>
  
  </div>
  </div>

        `;
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#printinfo');
  const comment = div.querySelector('#comment');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#postAdded');

  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
    <div class="user-image-landscape">
  
    </div>
    <div class="user-photo-name"><img class="user-photo" src="${myData.photo}" alt="">
    <div class="text-user">
    <p> ${myData.name}</p>
    <p>developer jr</p></div>
    </div>
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
   
      <div class="comment-post post">
      <div class="owner-post">
      <h3 class="font-size-post white ">${publi.user}</h3>
      <div class="cross" id="delete"></div>
      </div>
      <p class="font-size-post text-post">${publi.post}</p>
      <div class="color-post">
      <div class="container-click reaction">
      <div type="button" id="like" class="button-like click button-icon">${publi.likes} </div>
      <div id="edit" class=" button-paperPlane click button-icon"></div>
      
      </div>
      </div>
      
      </div>
      
      </div> `
      div.innerHTML = publicacion
      return div
    })
  });
  return div
};