/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React from 'react'
import UploadAvatar from '../../Component/Settings/UploadAvatar'
import UserName from '../../Component/Settings/UserName'
import './Settings.scss'

const Settings = ({ user, setreloadApp }) => {
  Settings.propTypes = {
    user: propTypes.object.isRequired,
    setreloadApp: propTypes.func.isRequired,
  }
  return (
    <div className="settings">
      <h1>Configuracion</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setreloadApp={setreloadApp} />
        <UserName user={user} />
      </div>
    </div>
  )
}

export default Settings
