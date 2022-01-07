/* eslint-disable no-unused-vars */
import React from 'react'
import propTypes from 'prop-types'
import { Button, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/firebaseConfig'

const UserName = ({ user }) => {
  UserName.propTypes = {
    user: propTypes.object.isRequired,
  }

  const onEdit = () => {
    console.log('editando el nombre de usuario.')
  }

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

export default UserName
