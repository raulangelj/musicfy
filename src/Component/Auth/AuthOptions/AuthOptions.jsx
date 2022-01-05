/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'semantic-ui-react'
import './AuthOptions.scss'

const AuthOptions = ({ setselectedForm }) => {
  const a = 0

  return (
    <div className="auth-options">
      <h2>Millones de canciones, gratis en Musicfy</h2>
      <Button className="register" onClick={() => setselectedForm('register')}>
        Registrarte Gratis
      </Button>
      <Button className="login" onClick={() => setselectedForm('login')}>
        Iniciar Sesion
      </Button>
    </div>
  )
}

export default AuthOptions
