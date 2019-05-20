import MockFirebase from 'mock-cloud-firestore';
import { getUserData, getRealTimeData, getRealTimePost, addPost, deletePost, editPost} from "../src/lib/controller-firebase/posts.js";

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
          photo: "yeni.jpg",
          privacy: "private",
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "Yeni",
          date: {seconds: 1558322863, nanoseconds: 816000000}
        }
      },
      234567: {
        likes: 0,
        post: "adios",
        photo: "perlita.jpg",
        privacy: "public",
        uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
        user: "perlita",
        date: {seconds: 1558310759, nanoseconds: 213000000}
      },
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

  describe('getUserData', () => {
  it('deberia capturar la data del usuario activi', (done) => {
    const user = {
      'displayName': 'Yeni',
      'email': 'yeni333@gmail.com',
      'photoURL': 'yeni.jpg',
      'uid': 'abcXXX123'
    }
    return getUserData(user).then(() => {
      const callback = (doc) => {
        const data = doc.data()
        expect(data.email).toEqual('yeni333@gmail.com')
        done()
      }
      getRealTimeData(user.uid, callback)
    })
  })
})

describe('agregar', () => {
  it('deberia agregar un post ', (done) => {
    return addPost('quiero leer', 'Kath Montalvo', 'abc123', 1, 'public', 'leer.jpg').then(() => {
      const callback = (notes) => {
        const result = notes.filter((note) => {
          return note.doc.post === 'quiero leer';
        })
        expect(result[0].doc.post).toBe('quiero leer');
        done()
      }
      getRealTimePost(callback)
    })
  })
})

describe('eliminar posts', () => {
  it('debe eliminar post con id 234567', (done) => {
    return deletePost('234567').then(() => {
      const callback = (notes) => {
        const result = notes.filter((note) => {
          return note.id === '234567';
        })
        expect(result[0]).toBe(undefined)
        done()
      }
      getRealTimePost(callback)
    })
  })
})

describe('editar post', () => {
  it('deberia retornar nuevo post: quiero dormir', (done) => {
    return editPost('123456', 'quiero dormir').then(() => {
      const callback = (notes) => {
        expect(notes[0].doc.post).toEqual('quiero dormir')
        done()
      }
      getRealTimePost(callback)
    })
  })
})