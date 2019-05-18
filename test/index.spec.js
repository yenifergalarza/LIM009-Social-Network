// const firebasemock = require('firebase-mock');
// const mockauth = new firebasemock.MockFirebase();
// global.firebase = new firebasemock.MockFirebaseSdk(
//   // use null if your code does not use RTDB
//   path => path ? mockdatabase.child(path) : null,
//   () => mockauth
// )
// mockauth.autoFlush();

// // import MockFirebase from '../_mocks_/firebase-mock.js';
// // global.firebase = MockFirebase();

// import { funcLogin, funcRegister, funcFacebook, funcGoogle, signOut, activeUser } from "../src/lib/controller-firebase/auth.js";

// describe('funcLogin', () => {
//   it('deberia retornar el email: abc@gmail.com', (done) => {
//     funcLogin('abc@gmail.com', '123456')
//       .then(user => {
//         expect(user.email).toBe('abc@gmail.com')
//         done()
//       });
//   });
// });

// describe('funcRegister', () => {
//   it('deberia registrar el email ingresado', (done) => {
//     funcRegister('emailabc@gmail.com', 'abc666')
//     .then((user) => {
//       // console.log(user)
//        expect(user.email).toBe('emailabc@gmail.com')
//       done()
//     });
//   });
// });

// describe('funcFacebook', () => {
//   it('deberia poder ingresar con facebook', (done) => {
//     funcFacebook()
//       .then((user) => {
//         expect(user.providerData[0].providerId).toBe('facebook.com')
//         done()
//       });
//   });
// });

// describe('funcGoogle', () => {
//   it('deberia poder ingresar con googÄºe', (done) => {
//     funcGoogle()
//       .then((user) => {
//         expect(user.providerData[0].providerId).toBe('google.com')
//         done()
//       })
//   });
// });

// describe('signOut', () => {
//   it('no deberia retornar ningun usuario', (done) => {
//     signOut()
//       .then(user => {
//         expect(user).toBe(undefined);
//         done()
//       })
//   })
// });

// describe('activeUser', () => {
//   it.only('deberia identificar si el usuario se encuentra activo', (done) => {

//    /*  return funcRegister('login@gmail.com', '123456')
//     .then(() => { */
//       const callback = user => {
//         console.log(user)
//         expect(user).toBe(null)
//         done()
//       }

//       activeUser(callback)
//    /*  }) */
//     })
// })

