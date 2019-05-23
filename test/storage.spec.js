global.firebase = {
  storage: () => ({
    ref: () => ({
      child: (key) => ({
        put: (file) => ({
          snapshot: {
            ref: {
              getDownloadURL: () => {
                return new Promise((resolve) => {
                  resolve(`https://storage.firebaseapp.com/${key}`);
                })
              }
            }
          },
          on: (evtName, loadingCb, errorCb, cb) => {
            cb();
          }
        })
      })
    })
  })
}


import { getImagePost } from "../src/lib/controller-firebase/posts.js";

describe('añadir img', () => {
  it('deberia añadir la img al storage', (done) => {
    const image = new File([], 'test-image.jpg')

    getImagePost(image, (url) => {
      expect(url).toBe('https://storage.firebaseapp.com/images/test-image.jpg')
      done()
    })
  })
})