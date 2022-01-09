/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Button, Form, FormField, Input, Icon,
} from 'semantic-ui-react'
import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { reauthenticate } from '../../firebase/Apis'
import alertErrors from '../../utils/AlertErros'
import { auth } from '../../firebase/firebaseConfig'

const ChangePasswordForm = ({ setModal }) => {
  const [isloading, setisloading] = useState(false)
  const [passwordsShow, setpasswordsShow] = useState({
    actualPassword: false,
    newPassword: false,
    newPassword2: false,
  })
  const [formData, setformData] = useState({
    actualPassword: '',
    newPassword: '',
    newPassword2: '',
  })

  ChangePasswordForm.propTypes = {
    setModal: propTypes.func.isRequired,
  }

  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    if (!formData.actualPassword || !formData.newPassword || !formData.newPassword2) {
      toast.warning('Las contraseñas no pueden estar vacias.')
    } else if (formData.newPassword !== formData.newPassword2) {
      toast.warning('Las nuevas contraseñas no son iguales.')
    } else if (formData.actualPassword === formData.newPassword) {
      toast.warning('La nueva contraseña no puede ser igual a la actual.')
    } else if (formData.newPassword.length < 6) {
      toast.warning('La nueva contraseña debe tener minimo 6 caracteres.')
    } else {
      console.log('enviando form', formData)
      setisloading(true)
      reauthenticate(formData.actualPassword)
        .then((res) => {
          console.log('todo correcto')
          const { currentUser } = auth
          currentUser.updatePassword(formData.newPassword)
            .then(() => {
              toast.success('Contraseña actualizada')
              setisloading(false)
              setModal((prevState) => ({
                ...prevState,
                show: false,
              }))
              auth.signOut()
            })
            .catch((err) => {
              alertErrors(err?.code)
              setisloading(false)
            })
        })
        .catch((err) => {
          alertErrors(err?.code)
          setisloading(false)
        })
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField>
        <Input
          placeholder="Contraseña actual"
          name="actualPassword"
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
      <Button type="submit" loading={isloading}>
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
