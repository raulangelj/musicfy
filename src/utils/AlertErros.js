import { toast } from 'react-toastify'

// FUNCTION TO HANDLE DIFERENTS FIREBASE AUTH ERRORS
const alertErrors = (errCode, context = '') => {
  switch (errCode) {
    case 'auth/user-not-found':
      toast.warning('Usario incorrecto.')
      break
    case 'auth/wrong-password':
      toast.warning('La contraseña introducida es incorrecta.')
      break
    case 'auth/email-already-in-use':
      toast.warning('El nuevo email ya esta en uso.')
      break
    case 'auth/too-many-requests':
      toast.warning('Has enviado demasiadas solicitudes de email de confirmacion en muy poco tiempo.')
      break
    case 'storage/object-not-found':
      toast.warning(`No se encontro la imagen${context}.`)
      break
    default:
      toast.warning('Ha ocurrido un error, revisa los datos e intentalo mas tarde.')
      break
  }
}

export default alertErrors
