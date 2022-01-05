/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase/firebaseConfig'
import AuthComponent from './pages/Auth/AuthComponent'

function App() {
  const [user, setUser] = useState(null)
  const [isloading, setisloading] = useState(true)

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      auth.signOut()
      setUser(null)
    } else {
      console.log('cambio el user', currentUser)
      setUser(currentUser)
    }
    setisloading(false)
  })

  if (isloading) {
    return null
  }

  return (
    <>
      {
        !user
          ? <AuthComponent />
          : <UserLogged />
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  )
}

const UserLogged = () => {
  const logout = () => {
    auth.signOut()
    console.log('auth', auth.currentUser)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <h1>Usuario loggeado</h1>
      <button type="button" onClick={logout}>Cerrar sesion</button>
    </div>
  )
}

export default App
