const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
global.firebase = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => path ? mockdatabase.child(path) : null,
  () => mockauth
)
mockauth.autoFlush();

import { funcLogin, funcRegister, funcFacebook, funcGoogle, signOut, activeUser, currentUser } from "../src/lib/controller-firebase/auth.js";

describe('funcLogin', () => {
  it('deberia retornar el email: abc@gmail.com', (done) => {
    funcLogin('abc@gmail.com', '123456')
      .then(user => {
        expect(user.email).toBe('abc@gmail.com')
        done()
      });
  });
});

describe('funcRegister', () => {
  it('deberia registrar el email ingresado', (done) => {
    funcRegister('emailabc@gmail.com', 'abc666')
    .then((user) => {
      // console.log(user)
       expect(user.email).toBe('emailabc@gmail.com')
      done()
    });
  });
});

describe('funcFacebook', () => {
  it('deberia poder ingresar con facebook', (done) => {
    funcFacebook()
      .then((user) => {
        expect(user.providerData[0].providerId).toBe('facebook.com')
        done()
      });
  });
});

describe('funcGoogle', () => {
  it('deberia poder ingresar con google', (done) => {
    funcGoogle()
      .then((user) => {
        expect(user.providerData[0].providerId).toBe('google.com')
        done()
      })
  });
});

describe('signOut', () => {
  it('no deberia retornar ningun usuario', (done) => {
    signOut()
      .then(user => {
        expect(user).toBe(undefined);
        done()
      })
  })
});

describe('activeUser', () => {
  it('deberia identificar si el usuario se encuentra activo', (done) => {
      const callback = user => {
          expect(user.email).toEqual('login@gmail.com')
          done()
        }
        activeUser(callback)
        funcLogin('login@gmail.com', '123456')
    })
})

describe('currentUser', () => {
    it('deberia tener usuario activo', (done) => {
         funcLogin('login@gmail.com', '123456')
        .then(()=> {
            const user = currentUser();
            expect(user.email).toEqual('login@gmail.com');
            done()
        })
    } )
})