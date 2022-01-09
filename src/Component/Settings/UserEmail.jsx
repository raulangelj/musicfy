/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import {
  Button, Form, FormField, Icon, Input,
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { reauthenticate } from '../../firebase/Apis'
import alertErrors from '../../utils/AlertErros'
import { auth } from '../../firebase/firebaseConfig'

const ChangeEmailForm = ({ user, setModal }) => {
  const [showPassword, setshowPassword] = useState(false)
  const [isloading, setisloading] = useState(false)
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  ChangeEmailForm.propTypes = {
    user: propTypes.object.isRequired,
    setModal: propTypes.func.isRequired,
  }

  const closeModal = () => {
    setModal((prevState) => ({
      ...prevState,
      show: false,
    }))
  }

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    if (!formData.email) {
      toast.warning('No se detecto ningun cambio en el correo para actualizar!')
    } else {
      setisloading(true)
      reauthenticate(formData.password)
        .then((res) => {
          const { currentUser } = auth
          currentUser.updateEmail(formData.email)
            .then(() => {
              toast.success('Email actualizado!')
              setisloading(false)
              setModal((prevState) => ({
                ...prevState,
                show: false,
              }))
              currentUser.sendEmailVerification()
                .then(() => {
                  auth.signOut()
                  toast.success('Se envio un correo de verificacio para activar el nuevo correo.')
                })
                .catch((err) => {
                  alertErrors(err.code)
                })
            })
            .catch((error) => {
              alertErrors(error?.code)
              setisloading(false)
            })
        })
        .catch((error) => {
          alertErrors(error?.code)
          setisloading(false)
        })
    }
  }

  const handleShowPassword = () => {
    setshowPassword(!showPassword)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField>
        <Input
          type="text"
          name="email"
          defaultValue={user.email}
          onChange={(e) => handleChange(e)}
        />
      </FormField>
      <FormField>
        <Input
          name="password"
          placeholder="Contraseña"
          type={showPassword ? 'text' : 'password'}
          icon={showPassword ? (
            <Icon name="eye slash outline" link onClick={handleShowPassword} />
          ) : (
            <Icon name="eye" link onClick={handleShowPassword} />
          )}
          onChange={(e) => handleChange(e)}
        />
      </FormField>
      <Button type="submit" loading={isloading}>
        Actualizar Correo
      </Button>
    </Form>
  )
}

const UserEmail = ({ user, setModal }) => {
  UserEmail.propTypes = {
    user: propTypes.object.isRequired,
    setModal: propTypes.func.isRequired,
  }

  const onEdit = () => {
    setModal({
      title: 'Actualizar Email',
      content: <ChangeEmailForm
        user={user}
        setModal={setModal}
      />,
      show: true,
    })
  }

  return (
    <div className="user-email">
      <h3>
        Email:
        {' '}
        {user.email}
      </h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

export default UserEmail
