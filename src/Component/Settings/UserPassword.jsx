/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'semantic-ui-react'
import propTypes from 'prop-types'

const UserPassword = ({ user }) => {
  UserPassword.propTypes = {
    user: propTypes.object.isRequired,
  }

  const onEdit = () => {
    console.log('cambio pasword')
  }

  return (
    <div className="user-password">
      <h3>Contraseña: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

export default UserPassword
