/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import './LoginForm.scss'
import validateEmail from '../../../utils/Validations'
import { auth } from '../../../firebase/firebaseConfig'

const defaultValueForm = () => ({
  email: '',
  password: '',
})

// FUNCTION TO HANDLE DIFERENTS FIREBASE AUTH ERRORS
const handleErrors = (errCode) => {
  switch (errCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      toast.warning('El usuario o la contraseña son incorrectos.')
      break
    case 'auth/too-many-requests':
      toast.warning('Has enviado demasiadas solicitudes de email de confirmacion en muy poco tiempo.')
      break
    default:
      toast.warning('Ha ocurrido un error, revisa tu correo y contraseña e intentalo mas tarde.')
      break
  }
}

// TEXT AND BUTTON TO RESEND VERIFICATION EMAIL
const ButtonResetSendEmailVerification = ({ user, setisloading, setuserActive }) => {
  ButtonResetSendEmailVerification.propTypes = {
    user: PropTypes.object.isRequired,
    setisloading: PropTypes.func.isRequired,
    setuserActive: PropTypes.func.isRequired,
  }

  const resendVerificationEmail = () => {
    user.sendEmailVerification()
      .then(() => {
        toast.success('Se ha enviado un email para verificar la cuenta.')
      })
      .catch((err) => {
        handleErrors(err)
      })
      .finally(() => {
        setisloading(false)
        setuserActive(null)
        // crea dos erroes de memory por que en el app.js el
        // onauthstatechanged cambie el componente antes de que termine de hacerse el finally
      })
  }

  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificacion puedes volver a enviarlo haciendo click
        {' '}
        <span onClick={resendVerificationEmail} aria-hidden="true">aqui</span>
      </p>
    </div>
  )
}

const LoginForm = ({ setselectedForm }) => {
  const [formData, setformData] = useState(defaultValueForm)
  const [showPassword, setshowPassword] = useState(false)
  const [formError, setformError] = useState({})
  const [isloading, setisloading] = useState(false)
  const [userActive, setuserActive] = useState(true)
  const [user, setuser] = useState(null)

  LoginForm.propTypes = {
    setselectedForm: PropTypes.func.isRequired,
  }

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleShowPassword = () => {
    setshowPassword(!showPassword)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const error = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      error.email = true
      formOk = false
    } else if (formData.password.length < 6) {
      error.password = true
      formOk = false
    }

    error !== formError && setformError(error)
    if (formOk) {
      setisloading(true)
      auth.signInWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          setuser(res.user)
          setuserActive(res.user.emailVerified)
          !res.user.emailVerified && toast.warning('Para hacer login primero debes de verificar tu correo.')
        })
        .catch((err) => {
          handleErrors(err.code)
        })
        .finally(() => {
          setisloading(false)
        // crea un erroes de memory por que en el app.js el
        // onauthstatechanged cambie el componente antes de que termine de hacerse el finally
        })
    }
  }

  return (
    <div className="login-form">
      <h1>Musica para todos.</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            onChange={(e) => handleChange(e)}
            error={formError.email}
          />
          {
            formError.email
            && (
            <span className="error-text">
              Por favor introduce un correo electronico valido
            </span>
            )
          }
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            onChange={(e) => handleChange(e)}
            error={formError.password}
            icon={
              showPassword
                ? <Icon name="eye slash outline" link onClick={handleShowPassword} />
                : <Icon name="eye" link onClick={handleShowPassword} />
            }
          />
          {
            formError.password
            && (
            <span className="error-text">
              La contraseña debe ser mayor a 5 caracteres.
            </span>
            )
          }
        </Form.Field>
        <Button type="submit" loading={isloading}>
          Iniciar sesion
        </Button>
      </Form>
      {
        !userActive && (
          <ButtonResetSendEmailVerification
            user={user}
            setisloading={setisloading}
            setuserActive={setuserActive}
          />
        )
      }
      <div className="login-form__options">
        <p onClick={() => setselectedForm(null)} aria-hidden="true">Volver</p>
        <p>
          ¿No tienes cuenta?
          {' '}
          <span onClick={() => setselectedForm('register')} aria-hidden="true">Registrate</span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
