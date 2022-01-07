/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React from 'react'
import './Settings.scss'

const Settings = ({ user }) => {
  Settings.propTypes = {
    user: propTypes.object.isRequired,
  }
  return (
    <div className="settings">
      <h1>Configuracion</h1>
    </div>
  )
}

export default Settings
