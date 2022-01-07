import { db } from './firebaseConfig'

const isUserAdmin = async (uid) => {
  const response = await db.collection('admins')
    .doc(uid)
    .get()
  return response.exists
}

export default isUserAdmin
