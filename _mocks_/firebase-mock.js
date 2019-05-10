const auth = () => {
    return {
        signInWithEmailAndPassword: (emailLogIn, passwordLogIn) => {
            return new Promise((resolve) => {
                resolve({
                    email: emailLogIn,
                })
            })
        }
    }
};

const firebase = {
    auth: auth,
    // initializeApp() {}
};

export default jest.fn(() => {
    return firebase
})