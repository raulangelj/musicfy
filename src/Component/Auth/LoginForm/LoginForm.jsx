/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import './LoginForm.scss'
import validateEmail from '../../../utils/Validations'
import { auth } from '../../../firebase/firebaseConfig'

const LoginForm = ({ setselectedForm }) => {
  LoginForm.propTypes = {
    setselectedForm: PropTypes.func.isRequired,
  }

  const onSubmit = () => {
    console.log('Login...')
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
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
          />
        </Form.Field>
        <Button type="submit">
          Iniciar sesion
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
