
  import MockFirebase from 'mock-cloud-firestore';
  const fixtureData = {
    __collection__: {
      posts: {
        __doc__: {
            123456: {     
likes: 0,
post :"hola",
privacy :"private",
state : true,
uid :"mZlFTubNrZPWBPQeMxUVoXX0exy1" ,
user :"Kathlen Montalvo" 
          },
          234567: {     
            likes: 0,
            post :"adios",
            privacy :"public",
            state : true,
            uid :"mZlFTubNrZPWBPQeMxUVoXX0exy1" ,
            user :"Kathlen Montalvo" 
                      },
        }
      }
    }
  };
  
  global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
  
  import { getRealTimeData,getRealTimePost, addPost, deletePost, editPost ,likePlus,updateUser} from "../src/lib/controller-firebase/firestore.js"
  
  describe('lista de notas', () => {
    it('Debería porder agregar una nota', (done) => {
      return addPost(123456,'hola')
        .then(() => getRealTimePost(
          (data) => {
            const result = data.find((post) => post.post === 'hola');
            expect(result.post).toBe('hola');
            done()
          }
        ))
    });
    it('Debería poder eliminar una nota', (done) => {
      return deleteNote('abc1d')
        .then(() => getNotes(
          (data) => {
            const result = data.find((note) => note.id === 'abc1d');
            expect(result).toBe(undefined);
            done()
          }
        ))
    })
  })
  