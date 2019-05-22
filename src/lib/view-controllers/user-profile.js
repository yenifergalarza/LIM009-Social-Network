
import { updateUser } from '../controller-firebase/user-profie.js'


export const updateUserDataName = (user, data) => {
  updateUser(user.uid, data)
}

