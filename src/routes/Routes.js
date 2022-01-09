/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import propTypes from 'prop-types'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Artist from '../pages/Artist'
// PAGES
import Home from '../pages/Home'
import Settings from '../pages/Settings'

const Routess = ({ user, setreloadApp }) => {
  Routess.propTypes = {
    user: propTypes.object.isRequired,
    setreloadApp: propTypes.func.isRequired,
  }
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/artists" element={<h1>Artist</h1>} />
      <Route exact path="/settings" element={<Settings user={user} setreloadApp={setreloadApp} />} />
      <Route exact path="/artist/:id" element={<Artist />} />
    </Routes>
  )
}

export default Routess
