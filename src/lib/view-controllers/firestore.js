import { getRealTimeData, addPost, getRealTimePost } from '../controller-firebase/firestore.js'

export const getUser = (cb) => {
  getRealTimeData((doc) => {
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log('check this document', doc);
      printinfo.innerHTML = `
          <p> Name: ${myData.name}</p>
          <img src= ${myData.photo} alt="user image">
          `
      cb(myData)
    }
  });
}

export const addNewPost = (user) => {
  addPost({
    post: comment.value,
    user: user.displayName,
    likes: 0,
    privacy: "public",
    state: true
  });
}