import { components } from "./ui/index.js";

const changeRoute = (hash) => {
  console.log(hash);
  const mainSection = document.getElementById('main');
  mainSection.innerHTML = '';
  // const login = document.getElementById('login');
  // login.innerHTML = '';

  switch (hash) {
    case '#':
    case '': {
      return mainSection.appendChild(components.login());
    };
    case '#/register': {
      return mainSection.appendChild(components.register());
    };
    case '#/content': {
      return mainSection.appendChild(components.content());
    };
    // default:
    //   return mainSection.appendChild(components.different());
  }

};

export const initRoute = () => {
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => changeRoute(window.location.hash))
};

