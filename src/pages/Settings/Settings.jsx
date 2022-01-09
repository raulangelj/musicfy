/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React, { useState } from 'react'
import BasicModal from '../../Component/Modal/BasicModal'
import UploadAvatar from '../../Component/Settings/UploadAvatar'
import UserEmail from '../../Component/Settings/UserEmail'
import UserName from '../../Component/Settings/UserName'
import UserPassword from '../../Component/Settings/UserPassword'
import './Settings.scss'

const Settings = ({ user, setreloadApp }) => {
  const [modal, setModal] = useState({
    show: false,
    title: '',
    content: '',
  })

  Settings.propTypes = {
    user: propTypes.object.isRequired,
    setreloadApp: propTypes.func.isRequired,
  }

  return (
    <div className="settings">
      <h1>Configuracion</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setreloadApp={setreloadApp} />
        <UserName user={user} setModal={setModal} setreloadApp={setreloadApp} />
      </div>
      <UserEmail user={user} setModal={setModal} />
      <UserPassword setModal={setModal} />
      <BasicModal show={modal.show} setmodal={setModal} title={modal.title}>
        {
          modal.content
        }
      </BasicModal>
    </div>
  )
}

export default Settings
