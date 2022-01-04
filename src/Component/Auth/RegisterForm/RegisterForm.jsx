/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { auth } from '../../../firebase/firebaseConfig'
import './RegisterForm.scss'

const defaultValueForm = () => ({
  email: '',
  password: '',
  username: '',
})

const RegisterForm = ({ setselectedForm }) => {
  const [formData, setformData] = useState(defaultValueForm)
  const [showPassword, setshowPassword] = useState(false)

  RegisterForm.propTypes = {
    setselectedForm: PropTypes.func.isRequired,
  }

  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlerShowPassword = () => {
    setshowPassword(!showPassword)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit', formData)
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
            onChange={(e) => handelChange(e)}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword} />
            ) : (
              <Icon name="eye" link onClick={handlerShowPassword} />
            )}
            onChange={(e) => handelChange(e)}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Como deberiamos llamarte?"
            icon="user circle outline"
            onChange={(e) => handelChange(e)}
            // error={}
          />
        </Form.Field>
        <Button type="Submit">
          Continuar
        </Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setselectedForm(null)} aria-hidden="true">Volver</p>
        <p>
          ¿YA tienes Musicfy?
          {' '}
          <span onClick={() => setselectedForm('login')} aria-hidden="true">Iniciar Sesion</span>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
