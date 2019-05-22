import { mocksdk } from './auth.spec.js'
import { getImagePost } from "../src/lib/controller-firebase/posts.js";

global.firebase = mocksdk;

describe('añadir img', () => {
  it('deberia añadir la img al storage', (done) => {
    const image = new File([], 'test-image.jpg')

    getImagePost(image, (url)=> {
      console.log(url)
    }).then(what => {
      console.log(what);
      done()
    })
  })
})