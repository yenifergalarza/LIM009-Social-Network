import MockFirebase from 'mock-cloud-firestore';
import { getUserData, getRealTimeData, getRealTimePost, addPost, deletePost, editPost, likePlus, updateUser } from "../src/lib/controller-firebase/firestore.js";

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        123456: {
          likes: 0,
          post: "hola",
          privacy: "private",
          state: true,
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "juanita"
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

// describe('agregar posts', () => {
//   it('deberia agregar un post', (done) => {
//     return addPost('quiero leer', 'Kath Montalvo', 'abc123', 1, 'public')
//       .then((res) => {
//         expect(res._data.post).toBe('quiero leer')
//         done()
//       })
//   })
// })

describe('addPost', () => {
  it('deberia agreagar un post ', (done) => {
    return addPost('quiero leer', 'Kath Montalvo', 'abc123', 1, 'public').then(() => {
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
    return deletePost('234567').then(()=>{
      const callback = (notes) => {
        const result = notes.filter((note)=>{
          return note.id === '234567';
        })
        expect(result[0]).toBe(undefined)
        done()
      }
      getRealTimePost(callback)
    })
  })
}) 