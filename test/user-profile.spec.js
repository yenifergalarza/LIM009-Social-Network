import {updateUser } from "../src/lib/controller-firebase/user-profie.js";
import { getRealTimeData } from "../src/lib/controller-firebase/posts.js";

import MockFirebase from 'mock-cloud-firestore';

import { fixtureData } from './posts.spec.js'

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