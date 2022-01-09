import { auth, db, firebaseApp } from './firebaseConfig'

//  @param uid = is the id of the current user to determin if is admin
const isUserAdmin = async (uid) => {
  const response = await db.collection('admins')
    .doc(uid)
    .get()
  return response.exists
}

// @param password = is the actual password of the current user
// allows to re log in the account to make significant use changes
const reauthenticate = (password) => {
  const user = auth.currentUser

  const credentials = firebaseApp.firebase.auth.EmailAuthProvider.credential(
    user.email,
    password,
  )

  return user.reauthenticateWithCredential(credentials)
}

export { isUserAdmin, reauthenticate }
