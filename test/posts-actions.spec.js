
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
          photo: "yeni.jpg",
          privacy: "private",
          uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
          user: "Yeni",
          date: { seconds: 1558322863, nanoseconds: 816000000 }
        }
      },
      234567: {
        likes: 0,
        post: "adios",
        photo: "perlita.jpg",
        privacy: "public",
        uid: "mZlFTubNrZPWBPQeMxUVoXX0exy1",
        user: "perlita",
        date: { seconds: 1558310759, nanoseconds: 213000000 }
      },
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });


import { privacyPost, likePlus,addComment,deleteComment} from "../src/lib/controller-firebase/posts-actions.js";
import { getRealTimePost} from "../src/lib/controller-firebase/posts.js";


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
    it.only('deberia agregar un comentario ', (done) => {
      return addComment('Dame croquetas','Pepi','axxYZ12',234567).then((a) => {
          console.log(a)
        // const callback = (notes) => {
        //   const result = notes.filter((note) => {
        //     return note.doc.post === 'Dame croquetas';
        //   })
        //   expect(result[0].doc.post).toBe('Dame croquetas');
        //   done()
        // }
        // getRealTimeComment(123456,callback)
      })
    })
  })
  
  describe('eliminar comentario', () => {
    const newLocal = 1234567;
    it('debe eliminar post con id 1234567', (done) => {
      return deleteComment(newLocal).then(() => {
        const callback = (notes) => {
          const result = notes.filter((note) => {
            return note.id === 1234567;
          }) 
          expect(result[0]).toBe(undefined)
         done()
        }
        getRealTimeComment(123456,callback)
      })
    })
  })