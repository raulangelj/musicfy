/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { Image, Input } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import NoAvatar from '../../assets/png/user.png'
import { auth, storage } from '../../firebase/firebaseConfig'

const UploadAvatar = ({ user }) => {
  const [avatarUrl, setavatarUrl] = useState(user.photo)

  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles)
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  })

  UploadAvatar.propTypes = {
    user: propTypes.object.isRequired,
  }

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
