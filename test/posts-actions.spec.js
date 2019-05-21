
import { privacyPost, likePlus,addComment,deleteComment} from "../src/lib/controller-firebase/posts-actions";
import { getRealTimePost} from "../src/lib/controller-firebase/posts.js";

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


describe('editar post', () => {
    it('deberia retornar  post con : 1 like', (done) => {
        return likePlus('123456', 1).then(() => {
            const callback = (notes) => {
                expect(notes[0].doc.likes).toEqual(1)
                done()
            }
            getRealTimePost(callback)
        })
    })
});


describe('editar post', () => {
    it('deberia retornar  post con privacy: public ', (done) => {
        return privacyPost('123456', "public").then(() => {
            const callback = (notes) => {
                expect(notes[0].doc.privacy).toEqual("public")
                done()
            }
            getRealTimePost(callback)
        })
    })
})


describe('agregar comentario', () => {
    it('deberia agregar un comentario ', (done) => {
      return addComment('Dame croquetas', 'Sillao el chihuahua', 'abc123',  234567).then(() => {
        const callback = (notes) => {
          const result = notes.filter((note) => {
            return note.doc.post === 'Dame croquetas';
          })
          expect(result[0].doc.post).toBe('Dame croquetas');
          done()
        }
        getRealTimePost(callback)
      })
    })
  })
  
  describe('eliminar comentario', () => {
    it('debe eliminar post con id 234567', (done) => {
      return deleteComment('234567').then(() => {
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