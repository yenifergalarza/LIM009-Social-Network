import {updateUser } from "../src/lib/controller-firebase/user-profie.js";

import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        axxYZ12: {
          name: 'Pepi',
          email: 'pepi@mail.com',
          photo: 'pepita.jpg',
          uid: 'axxYZ12'
        }
      }
    },
    posts: {
      __doc__: {
        123456: {
          likes: 0,
          post: "hola",
          privacy: "private",
          state: true,
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "Yeni"
        }
      },
      234567: {
        likes: 0,
        post: "adios",
        privacy: "public",
        state: true,
        uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
        user: "perlita"
      },
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });



describe('editar nombre de usuario', () => {
  it('deberia nuevo nombre', (done) => {
     
    return updateUser({
        displayName: 'Yeni',
        email: 'yeni333@gmail.com',
        photoURL: 'yeni.jpg',
        uid: 'abcXXX123'
      }, 'juanita').then(() => {
      const callback = (user) => {
        expect(user.doc.displayName).toEqual('juanita')
        done()
      }
      getRealTimePost(callback)
    })
  })
})