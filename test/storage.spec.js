
const firebasemock = require('firebase-mock');
const mockstorage = new firebasemock.MockStorage()


const mocksdk = new firebasemock.MockFirebaseSdk(
  () => {
    return mockstorage;
  }
);


global.firebase = mocksdk;

import { getImagePost } from "../src/lib/controller-firebase/posts.js";

describe('añadir img', () => {
  it('deberia añadir la img al storage', (done) => {
    const image = new File([], 'test-image.jpg')

    getImagePost(image, (url)=> {
      console.log(url)
      done()
    })
  })
})