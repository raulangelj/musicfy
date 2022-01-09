/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { Image, Input } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import NoAvatar from '../../assets/png/user.png'
import { auth, storage } from '../../firebase/firebaseConfig'

const UploadAvatar = ({ user, setreloadApp }) => {
  const [avatarUrl, setavatarUrl] = useState(user.photoURL)

  UploadAvatar.propTypes = {
    user: propTypes.object.isRequired,
    setreloadApp: propTypes.func.isRequired,
  }

  const uploadImage = (file) => {
    const ref = storage
      .ref()
      .child(`avatar/${user.uid}`)
    return ref.put(file)
  }

  const updateUserAvatar = () => {
    storage
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (res) => {
        await auth.currentUser.updateProfile({ photoURL: res })
        setreloadApp((prevState) => !prevState)
      })
      .catch((error) => {
        toast.error('Erro al actualizar avatar.')
      })
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setavatarUrl(URL.createObjectURL(file))
    uploadImage(file)
      .then((res) => {
        updateUserAvatar()
      })
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  })

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ? (
          <Image src={NoAvatar} />
        ) : (
          <Image src={avatarUrl || NoAvatar} />
        )
      }
    </div>
  )
}

export default UploadAvatar
