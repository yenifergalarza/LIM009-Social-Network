import { fixtureData } from './posts.spec.js'


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import MockFirebase from 'mock-cloud-firestore';

import { privacyPost, likePlus, addComment, deleteComment } from "../src/lib/controller-firebase/posts-actions";
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
  it.only('deberia agregar un comentario ', (done) => {
    return addComment(
      'Dame croquetas', 'Pepi', 'axxYZ12', 123456).then((a) => {
        console.log(a);
        // const callback = (comment) => {
        //   console.log(comment)
        //   // const result = comment.filter((note) => {
        //   //   note.doc.post === 'Dame croquetas';
        // // })
        // //   expect(result[0].doc.post).toBe('Dame croquetas');
        // done()
        // }
        // getRealTimeComment(123456, callback)
      })
  })
})

describe('eliminar comentario', () => {
  it('debe eliminar post con id 234567', (done) => {
    return deleteComment('234567').then(() => {
      const callback = (comments) => {
        const result = comments.filter((note) => {
          return note.id === '234567';
        })
        expect(result[0]).toBe(undefined)
        done()
      }
      getRealTimeComment(callback)
    })
  })
})