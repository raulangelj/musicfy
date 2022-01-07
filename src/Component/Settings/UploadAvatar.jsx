/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Image } from 'semantic-ui-react'
import NoAvatar from '../../assets/png/user.png'

const UploadAvatar = ({ user }) => {
  const [avatarUrl, setavatarUrl] = useState(user.photo)

  UploadAvatar.propTypes = {
    user: propTypes.object.isRequired,
  }

  return (
    <div className="user-avatar">
      <Image src={avatarUrl || NoAvatar} />
    </div>
  )
}

export default UploadAvatar
