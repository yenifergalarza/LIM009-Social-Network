const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
global.firebase = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => path ? mockdatabase.child(path) : null,
  () =>  mockauth
)
mockauth.autoFlush();

// import MockFirebase from '../_mocks_/firebase-mock.js';
// global.firebase = MockFirebase();

import { funcLogin } from "../src/lib/controller-firebase/auth.js";

describe('funcLogin', () => {
  it('deberia retornar el email: abc@gmail.com', () => {
    return funcLogin('abc@gmail.com', '123456')
      .then(user => {
        expect(user.email).toBe('abc@gmail.com')
      });
  });
});


