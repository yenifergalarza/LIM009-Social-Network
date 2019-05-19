import { signOutUser } from '../lib/view-controllers/auth.js';
import { addNewPost, getUser, deletePosts, editPosts, addingLikes, updateUserDataName, getImage } from '../lib/view-controllers/firestore.js';
import { currentUser } from '../lib/controller-firebase/auth.js';

const listPosts = (publi) => {
  const div = document.createElement('div')
  const publicacion = `
    <div class="comment-post post">
      <div class="owner-post">
        <h3 class="font-size-post white ">Publicado por <span>${publi.doc.user}</span> </h3>
        <div class="cross" id="delete"></div>
      </div>
      <div>
        <div class="font-size-post px-6" id="post-message"> ${publi.doc.post}</div>
        <input id="update-data" class="hide px-6" value= ${publi.doc.post} />
        <div id="photoUploaded"></div>     
      </div>
      <div class="color-post">
        <div class="container-click reaction">
          <div class="displayFlex w-30"> 
            <label class="lineCenter">${publi.doc.likes}</label>
            <div type="button" class="button-like click button-icon" data-value=${publi.doc.likes}>${publi.doc.likes}</div>
          </div>
         
          <div id="edit" class=" button-pencil click button-icon">Editar</div>
          <div id="reply" class=" button-paperPlane click button-icon">reply</div>
        </div>
          
        <select name="privacy" id="edit-privacy" class="ml-39"> 
          <option value="public">Público </option>
          <option value="private">Solo yo</option>
        </select>
      </div>
    </div>
  `
  div.innerHTML = publicacion;

  const postImg = div.querySelector('#photoUploaded')

  if(publi.doc.photo !== ''){
    const image = document.createElement('img')
    image.setAttribute('src', publi.doc.photo)
    image.setAttribute('height', '150px')
    postImg.appendChild(image)
  }

  // if(publi.doc.photo !== ''){
  //   postImg.innerHTML= `<img src=${publi.doc.photo} height=150px >`
  // }

  const like = div.querySelector('.button-like');
  let numberLike = Number(like.dataset.value);

  like.addEventListener('click', () => addingLikes(publi, numberLike + 1));

  const btnDelete = div.querySelector('#delete');
  btnDelete.addEventListener('click', () => deletePosts(publi));

  const btnEdit = div.querySelector('#edit');
 


  btnEdit.addEventListener('click',()=>{
    const textPost = div.querySelector('#post-message');
    const updateData =  div.querySelector("#update-data"); 
    updateData.classList.toggle('hide');
    if(updateData.value!=""){
      editPosts(publi, updateData.value);
      };
      textPost.classList.toggle('hide');
  });





  
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
        <input type="file" accept="image/*"  id="image-file" class="hide">
        <label class="button-photo click button-icon" for="image-file"> </label>
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
const buttonAddImage = div.querySelector('#add-image')
  const buttonLogOut = div.querySelector('#btn-out');
  const printinfo = div.querySelector('#print-info');
  const comment = div.querySelector('#comment');
  const add = div.querySelector('#add');
  const postAdded = div.querySelector('#post-added');
  const privacy = div.querySelector('#select-privacy');
  const imageFile = div.querySelector('#image-file')

  buttonLogOut.addEventListener('click', signOutUser)
  getUser((myData) => {
    printinfo.innerHTML = `
      <div class="user-image-landscape">
      </div>
  
      <div class="user-photo-name">
        <img class="user-photo" src="${myData.photo}" alt="">
      <div class="text-user">
      <p id="nameNeedChange"> ${myData.name}</p>
      <input id="inputName" class="hide"/>
      <div class="button-pencil click button-icon" class="hide" id="changeName"> </div>

      <p>developer jr</p>
  `;

const buttonActionChange = printinfo.querySelector('#changeName');
buttonActionChange.addEventListener('click',()=>{
  const nameNeedChange = printinfo.querySelector('#nameNeedChange')
  const inputNewName =  printinfo.querySelector("#inputName"); 
  inputNewName.classList.toggle('hide');
  if(inputNewName.value!=""){
  updateUserDataName(myData,inputNewName.value);
    };
    nameNeedChange.classList.toggle('hide');
})
  });

  imageFile.addEventListener('change', (event) => {
    const file = event.target.files;
    getImage(file)
  })
  add.addEventListener('click', () => {
    const file = imageFile.files.length
    addNewPost(comment.value, privacy.value, file)
  });
  // const postId = posts.find(post =>{
  //   return post.doc.id == currentUser.uid
  // })
  // console.log(postId)
  posts.forEach(publi => {
    if (publi.doc.privacy == 'public') {
      postAdded.appendChild(listPosts(publi))
    } else if (publi.doc.privacy == 'private' && currentUser().uid == publi.doc.uid) {
      postAdded.appendChild(listPosts(publi))
    }
  })
  return div
};