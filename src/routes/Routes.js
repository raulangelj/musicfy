/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

const Routess = () => {
  const a = 0
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/artists" element={<h1>Artist</h1>} />
      <Route exact path="/settings" element={<h1>Configuracion de cuenta</h1>} />
    </Routes>
  )
}

export default Routess
