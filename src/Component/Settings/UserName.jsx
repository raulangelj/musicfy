/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import {
  Button, Form, FormField, Input,
} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/firebaseConfig'

const ChangeDisplayNameForm = ({ displayName, setModal, setreloadApp }) => {
  const [formData, setformData] = useState({ displayName })
  const [isloading, setisloading] = useState(false)

  ChangeDisplayNameForm.propTypes = {
    setModal: propTypes.func.isRequired,
    setreloadApp: propTypes.func.isRequired,
    displayName: propTypes.string.isRequired,
  }

  const closeModal = () => {
    setModal((prevState) => ({
      ...prevState,
      show: false,
    }))
  }

  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      closeModal()
      toast.error('No se detecto ningun cambio en el nombre, el nombre no puede quedar vacio.')
    } else {
      setisloading(true)
      auth.currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setreloadApp((prevState) => !prevState)
          toast.success('Nombre actualizado correctamente!')
          setisloading(false)
          closeModal()
        })
        .catch(() => {
          toast.error('Error al actualizar el nombre, intentalo mas tarde.')
          setisloading(false)
        })
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField>
        <Input
          defaultValue={displayName}
          onChange={(e) => setformData({ displayName: e.target.value })}
        />
      </FormField>
      <Button type="submit" loading={isloading}>
        Actualizar Nombre
      </Button>
    </Form>
  )
}

const UserName = ({ user, setModal, setreloadApp }) => {
  UserName.propTypes = {
    user: propTypes.object.isRequired,
    setModal: propTypes.func.isRequired,
    setreloadApp: propTypes.func.isRequired,
  }

  const onEdit = () => {
    setModal({
      title: 'Actualizar Nombre',
      content: <ChangeDisplayNameForm
        setModal={setModal}
        displayName={user.displayName}
        setreloadApp={setreloadApp}
      />,
      show: true,
    })
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
