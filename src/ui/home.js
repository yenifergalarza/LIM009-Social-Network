import { signOutUser } from '../lib/view-controllers/auth.js';
import { getUser, getImage, addNewPost} from '../lib/view-controllers/posts.js';
import { updateUserDataName } from '../lib/view-controllers/user-profile.js';
import { currentUser } from '../lib/controller-firebase/auth.js';
import { listPosts } from './posts.js'

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
        <li class="relative">
          <a href="" class="blackBack hoverA"> 
            <div class="displayFlex">
              <button id="btn-out" class="click button-icon button-leave"></button>
              <span class="white"> Cerrar sesión </span>
            </div>  
          </a>
        </li>
        <li class="relative">
          <a class="blackBack white  hoverA" href="">
            <div class="displayFlex">
              <button id="btn-out" class="click button-icon button-bulb"></button>
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