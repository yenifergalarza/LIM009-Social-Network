import MockFirebase from 'mock-cloud-firestore';
import { getRealTimeData, getRealTimePost, addPost, deletePost, editPost, likePlus, updateUser } from "../src/lib/controller-firebase/firestore.js";

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        123456: {
          likes: 0, post: "hola", privacy: "private", state: true, uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1", user: "juanita"
        }
      },
      234567: {
        likes: 0, post: "adios", privacy: "public", state: true, uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1", user: "perlita"
      },
    }
  }
}
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('agregar posts', () => {
  it('deberia agregar un post', (done) => {
    return addPost('quiero leer', 'Kath Montalvo', 'abc123', 1, 'public')
      .then((res) => {
        expect(res._data.post).toBe('quiero leer')
        done()
      })
  })
})

describe('addPost', () => {
  it('deberia agreagar un post ', (done) => {
    return addPost('quiero leer', 'Kath Montalvo', 'abc123', 1, 'public').then(() => {
      const callback = (notes) => {
        console.log(notes);
        done()
      }
      getRealTimePost(callback)
    })
  })
})