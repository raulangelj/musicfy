/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { auth } from './firebase/firebaseConfig'
import AuthComponent from './pages/Auth/AuthComponent'

function App() {
  const [user, setUser] = useState(null)
  const [isloading, setisloading] = useState(true)

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser) {
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setisloading(false)
  })

  if (isloading) {
    return null
  }

  return (
    !user ? (
      <AuthComponent />
    ) : <h1>Usuario Loggeado</h1>
  )
}

export default App
