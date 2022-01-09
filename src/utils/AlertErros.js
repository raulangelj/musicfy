import { toast } from 'react-toastify'

// FUNCTION TO HANDLE DIFERENTS FIREBASE AUTH ERRORS
const alertErrors = (errCode) => {
  console.log(errCode)
  switch (errCode) {
    case 'auth/user-not-found':
      toast.warning('Usario incorrecto.')
      break
    case 'auth/wrong-password':
      toast.warning('La contraseña introducida es incorrecta.')
      break
    case 'auth/too-many-requests':
      toast.warning('Has enviado demasiadas solicitudes de email de confirmacion en muy poco tiempo.')
      break
    default:
      toast.warning('Ha ocurrido un error, revisa tu correo y contraseña e intentalo mas tarde.')
      break
  }
}

export default alertErrors