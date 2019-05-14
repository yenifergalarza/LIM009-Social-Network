import { components } from "./ui/index.js";
import { activeUser, currentUser } from "./lib/controller-firebase/auth.js"

const changeRoute = (hash) => {
  console.log(hash);
  const mainSection = document.getElementById('main');
  mainSection.innerHTML = '';

  switch (hash) {
    case '#':
    case '': {
      return mainSection.appendChild(components.login());
    };
    case '#/register': {
      return mainSection.appendChild(components.register());
    };
    case '#/content': {
     activeUser( () => {
      if(currentUser())
      return mainSection.appendChild(components.content());
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
