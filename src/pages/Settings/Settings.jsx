/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React from 'react'
import UploadAvatar from '../../Component/Settings/UploadAvatar'
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
        <h2>User Name</h2>
      </div>
    </div>
  )
}

export default Settings
