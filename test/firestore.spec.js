import MockFirebase from 'mock-cloud-firestore';
import { getUserData, addPost } from "../src/lib/controller-firebase/firestore";

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        doc_1: {
          post: 'nota de prueba',
          user: 'pepe ramos',
          userId: 'uidXXX123',
          likes: 0,
          privacy: 'private'
        }
      }
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