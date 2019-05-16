import { components } from "./ui/index.js";
import { activeUser, currentUser } from "./lib/controller-firebase/auth.js"
import { getRealTimePost } from './lib/controller-firebase/firestore.js'

const changeRoute = (hash) => {
  console.log(hash);
  const mainSection = document.getElementById('main');
  mainSection.innerHTML = '';

  switch (hash) {
    case '#':
    case '':
    case '#/': {
      return mainSection.appendChild(components.login());
    };
    case '#/register': {
      return mainSection.appendChild(components.register());
    };
    case '#/content': {
     activeUser( () => { 
      if(currentUser()){ 
        getRealTimePost(posts => { 
          mainSection.innerHTML = ''
          return mainSection.appendChild(components.content(posts));
        })
      }
      }) 
    };
    // default:
    //   return mainSection.appendChild(components.different());
  }

};

export const initRoute = () => {
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => changeRoute(window.location.hash))
};
