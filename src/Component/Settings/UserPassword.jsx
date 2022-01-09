/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Button, Form, FormField, Input, Icon,
} from 'semantic-ui-react'
import propTypes from 'prop-types'

const ChangePasswordForm = ({ setModal }) => {
  const [passwordsShow, setpasswordsShow] = useState({
    actualPassword: false,
    newPassword: false,
    newPassword2: false,
  })

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
          name="atualPassword"
          type={passwordsShow.actualPassword ? 'text' : 'password'}
          icon={
            passwordsShow.actualPassword ? (
              <Icon
                link
                name="eye slash outline"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    actualPassword: !prevState.actualPassword,
                  }))
                }}
              />
            ) : (
              <Icon
                link
                name="eye"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    actualPassword: !prevState.actualPassword,
                  }))
                }}
              />
            )
          }
        />
      </FormField>
      <FormField>
        <Input
          placeholder="Nueva contraseña"
          name="newPassword"
          type={passwordsShow.newPassword ? 'text' : 'password'}
          icon={
            passwordsShow.newPassword ? (
              <Icon
                link
                name="eye slash outline"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    newPassword: !prevState.newPassword,
                  }))
                }}
              />
            ) : (
              <Icon
                link
                name="eye"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    newPassword: !prevState.newPassword,
                  }))
                }}
              />
            )
          }
        />
      </FormField>
      <FormField>
        <Input
          placeholder="Repetir nueva contraseña"
          name="newPassword2"
          type={passwordsShow.newPassword2 ? 'text' : 'password'}
          icon={
            passwordsShow.newPassword2 ? (
              <Icon
                link
                name="eye slash outline"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    newPassword2: !prevState.newPassword2,
                  }))
                }}
              />
            ) : (
              <Icon
                link
                name="eye"
                onClick={() => {
                  setpasswordsShow((prevState) => ({
                    ...prevState,
                    newPassword2: !prevState.newPassword2,
                  }))
                }}
              />
            )
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
