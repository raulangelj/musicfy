/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { auth } from '../../../firebase/firebaseConfig'
import './RegisterForm.scss'
import validateEmail from '../../../utils/Validations'

const defaultValueForm = () => ({
  email: '',
  password: '',
  username: '',
})

const RegisterForm = ({ setselectedForm }) => {
  const [formData, setformData] = useState(defaultValueForm)
  const [showPassword, setshowPassword] = useState(false)
  const [formError, setformError] = useState({})
  const [isloading, setisloading] = useState(false)

  RegisterForm.propTypes = {
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

  const changeUserName = (user) => {
    user?.updateProfile({
      displayName: formData.username,
    })
      .catch(() => {
        toast.error('Error al asignar el nombre de usuario.')
      })
  }

  const sendVerificationEmail = (user) => {
    user?.sendEmailVerification()
      .then(() => {
        toast.success('Se ha enviado un email de verificacion.')
      })
      .catch(() => {
        toast.error('Error al enviar el email de verificacion.')
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // setformError({})
    const error = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      error.email = true
      formOk = false
    } else if (formData.password.length < 6) {
      error.password = true
      formOk = false
    } else if (!formData.username) {
      error.username = true
      formOk = false
    }

    error !== formError && setformError(error)
    if (formOk) {
      setisloading(true)
      auth.createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          const { user } = response
          changeUserName(user)
          sendVerificationEmail(user)
        })
        .catch((err) => {
          toast.error('Error al crear la cuenta.')
        })
        .finally(() => {
          setisloading(false)
          setselectedForm(null)
          // crea dos erroes de memory por que en el app.js el
          // onauthstatechanged cambie el componente antes de que termine de hacerse el finally
        })
    }
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo Electronico"
            icon="mail outline"
            onChange={(e) => handleChange(e)}
            error={formError.email}
          />
          {
            formError.email && (
              <span className="error-text">
                Por favor, introduce un correo electronico valido.
              </span>
            )
          }
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contrase??a"
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handleShowPassword} />
            ) : (
              <Icon name="eye" link onClick={handleShowPassword} />
            )}
            onChange={(e) => handleChange(e)}
            error={formError.password}
          />
          {
            formError.password && (
              <span className="error-text">
                Elige una contrase??a mayor a 5 caracteres.
              </span>
            )
          }
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="??Como deberiamos llamarte?"
            icon="user circle outline"
            onChange={(e) => handleChange(e)}
            error={formError.username}
          />
          {
            formError.username && (
              <span className="error-text">
                Por favor introduce un nombre.
              </span>
            )
          }
        </Form.Field>
        <Button type="Submit" loading={isloading}>
          Continuar
        </Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setselectedForm(null)} aria-hidden="true">Volver</p>
        <p>
          ??YA tienes Musicfy?
          {' '}
          <span onClick={() => setselectedForm('login')} aria-hidden="true">Iniciar Sesion</span>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
