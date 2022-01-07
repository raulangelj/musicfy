/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Settings from '../pages/Settings'

const Routess = ({ user }) => {
  Routess.propTypes = {
    user: propTypes.object.isRequired,
  }
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/artists" element={<h1>Artist</h1>} />
      <Route exact path="/settings" element={<Settings user={user} />} />
    </Routes>
  )
}

export default Routess
