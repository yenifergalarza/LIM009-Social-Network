import { signOutUser } from '../lib/view-controllers/auth.js';
import { currentUser } from '../lib/controller-firebase/auth.js';
import { getRealTimePost, getUserData, getRealTimeData  } from '../lib/controller-firebase/firestore.js';
import { addNewPost,getUser} from '../lib/view-controllers/firestore.js';

export const Content = () => {
  const div = document.createElement('div');
  div.innerHTML = `
  

<nav class="nav"> 
<div class="nav-content">
<div id="btn-out" class="menu"></div>
<h1 class="white">Welcome </h1>
</div>
</nav>
<div class="container" >
<div class="container-user" id="printinfo">
   
   
</div>

<div class="posts"  id="allContainer">
<div id="editpost" class="edit-post post ">
<textarea name="" id="write-post" cols="30" rows="10" class="write-post "></textarea>
  <div class="container-click">
  <div type="button" id="add-image" class="button-photo click button-icon"> </div>
  <div id="add" class="button-share click white">comparte</div>
  
  </div>
</div>

</div> 
</div>
  `;
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#printinfo');
  const comment = div.querySelector('#comment');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#postAdded');
  const allContainer = div.querySelector('#allContainer');

  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
   
    <div class="user-image-landscape">
    
    </div>
    <div class="user-photo-name"><img class="user-photo" src="${myData.photo}" alt="">
    <div class="text-user">
    <p></p>
    <p>${myData.name}</p></div>
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
      <h3 class="font-size-post white ">Publicado por ${publi.user}</h3>
      <div class="cross" id="delete"></div>
      </div>
      <p class="font-size-post text-post">${publi.post}</p>
      <div class="color-post">
      <div class="container-click reaction">
      <div type="button" id="like" class="button-like click button-icon"> </div>
      <div id="edit" class=" button-paperPlane click button-icon"></div>
      
      </div>
      
      
       `
      allContainer.innerHTML += publicacion
      return div
    })
  });
  return div
};