/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react'
import { auth } from '../../../firebase/firebaseConfig'
import './RegisterForm.scss'

const RegisterForm = ({ setselectedForm }) => {
  const onSubmit = () => {
    console.log('submit')
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
            // onChange={}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="eye"
            // onChange={}
            // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Como deberiamos llamarte?"
            icon="user circle outline"
            // onChange={}
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
