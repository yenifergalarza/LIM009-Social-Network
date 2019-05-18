
  import MockFirebase from 'mock-cloud-firestore';
  const fixtureData = {
    __collection__: {
      posts: {
        __doc__: {
            123456: {     
likes: 0,post : "hola",privacy :"private",state : true,uid :"mZlFTubNrZPWBPQeMxUVoXX0exy1" ,user :"juanita"
} 
          },
          234567: {     
        likes: 0, post :"adios",privacy :"public",state : true,uid :"mZlFTubNrZPWBPQeMxUVoXX0exy1" ,user :"perlita" 
                      },
        }
      }
    }
    const user = {displayName:"juanita"};
  
  global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
  
  import { getRealTimeData,getRealTimePost, addPost, deletePost, editPost ,likePlus,updateUser} from "../src/lib/controller-firebase/firestore.js";
describe('addPost',()=>{
    it('deberia agreagar un post ',(done)=>{
        return addPost('hola',user,0,"private").then((data)=>{
            const callback =(notes)=>{
                console.log(notes);
            done()
            }
            getRealTimePost(callback)
                })
    })
})