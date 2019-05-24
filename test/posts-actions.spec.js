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
          __collection__: {
            comments: {
              __doc__: {
                1234567: {
                  date: { seconds: 1558350759, nanoseconds: 213000000 },
                  postId: 123456,
                  post: "holaaaa",
                  uid: "axxYZ12",
                  user: "Pepi",
                }
              }
            }
          },
          likes: 0,
          post: "hola",
          photo: "yeni.jpg",
          privacy: "private",
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "Yeni",
          date: { seconds: 1558322863, nanoseconds: 816000000 }

        },
        234567: {
          __collection__: {
            comments: {
              __doc__: {
                2345678: {
                  date: { seconds: 1558300759, nanoseconds: 213100000 },
                  postId: 234567,
                  post: "adios",
                  uid: "axxYZ12",
                  user: "Pepi",
                }
              }
            }
          },
          likes: 0,
          post: "adios",
          photo: "perlita.jpg",
          privacy: "public",
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "perlita",
          date: { seconds: 1558310759, nanoseconds: 213000000 },

        }
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import { privacyPost, likePlus, addComment, deleteComment, getRealTimeComment, editComment } from "../src/lib/controller-firebase/posts-actions";
import { getRealTimePost } from "../src/lib/controller-firebase/posts.js";


describe('darle like', () => {
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


describe('editar privacidad de post', () => {
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
    return addComment('Dame croquetas', 'Pepi', 'axxYZ12', '234567').then(() => {
      const callback = (notes) => {
        const result = notes.filter((note) => {
          return note.doc.post === 'Dame croquetas';
        })
        expect(result[0].doc.post).toEqual('Dame croquetas');
        done()
      }
      getRealTimeComment('234567', callback)
    })
  })

});
describe('eliminar comentario', () => {
  it('debe eliminar comment con id ', (done) => {
    return deleteComment('123456', '1234567').then(() => {
      const callback = (notes) => {
        const result = notes.filter((note) => {
          return note.id === '1234567';
        })
        expect(result[0]).toBe(undefined)
        done()
      }
      getRealTimeComment('123456', callback)
    })
  })
})

describe('editar comentario', () => {
  it('debe editar comment con id ', (done) => {
    return editComment('234567', '2345678', "juana estuvo aqui").then(() => {
      const callback = (notes) => {
        const result = notes.filter((note) => {
          return note.id === '2345678';
        })
        expect(result[0]['doc'].post).toBe("juana estuvo aqui")
        done()
      }
      getRealTimeComment('234567', callback)
    })
  })
});
