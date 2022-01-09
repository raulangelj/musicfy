/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Button, Form, FormField, Input, Icon,
} from 'semantic-ui-react'
import propTypes from 'prop-types'

const ChangePasswordForm = ({ setModal }) => {
  ChangePasswordForm.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const onSubmit = () => {
    console.log('enviando form')
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField>
        <Input
          placeholder="Contraseña actual"
          type="password"
          icon={
            <Icon link name="eye" />
          }
        />
      </FormField>
      <FormField>
        <Input
          placeholder="Nueva contraseña"
          type="password"
          icon={
            <Icon link name="eye" />
          }
        />
      </FormField>
      <FormField>
        <Input
          placeholder="Repetir nueva contraseña"
          type="password"
          icon={
            <Icon link name="eye" />
          }
        />
      </FormField>
      <Button type="submit">
        Actualizar contraseña
      </Button>
    </Form>
  )
}

const UserPassword = ({ setModal }) => {
  UserPassword.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const onEdit = () => {
    setModal({
      title: 'Actualizar Contraseña',
      content: <ChangePasswordForm setModal={setModal} />,
      show: true,
    })
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
