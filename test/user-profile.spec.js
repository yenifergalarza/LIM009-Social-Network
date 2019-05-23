import {updateUser } from "../src/lib/controller-firebase/user-profie.js";
import { getRealTimeData } from "../src/lib/controller-firebase/posts.js";

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
          date: {
            seconds: 1558322863,
            nanoseconds: 816000000
          },
          __collection__: {
            comments: {
              __doc__: {
                1234567: {
                  date: {
                    seconds: 1558350759,
                    nanoseconds: 213000000
                  },
                  postId: 123456,
                  post: "holaaaa",
                  uid: "axxYZ12",
                  user: "Pepi",
                }
              }
            }
          }
        },
        234567: {
          __collection__: {
            comments: {
              __doc__: {
                2345678: {
                  date: {
                    seconds: 1558300759,
                    nanoseconds: 213100000
                  },
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
          date: {
            seconds: 1558310759,
            nanoseconds: 213000000
          },

        }
      }
    }
  }
};


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });



describe('editar nombre de usuario', () => {
  it('deberia nuevo nombre', (done) => {
     
    return updateUser('axxYZ12', 'Juanita')
    .then(() => {
      const callback = (user) => {
      
        
        const data = user.data()
        expect(data.name).toEqual('Juanita')
        done()
      }
      getRealTimeData('axxYZ12', callback)
    })
  })
})